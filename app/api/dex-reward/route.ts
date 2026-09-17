import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { Redis } from "@upstash/redis";

const RPC_URL = (process.env.BSC_RPC_URL || "https://bsc-rpc.publicnode.com").replace(/\/$/, "");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Funzione helper per mettere in pausa l'esecuzione
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: Request) {
    try {
        const body = await req.json();
        let { txHash, userWallet, type, actionType } = body;
        if (!type && actionType) {
            type = actionType === "limit-order" ? "limit" : actionType === "swap" ? "swap" : null;
        }

        if (!txHash || !userWallet || !type) {
            return NextResponse.json({ success: false, error: "Parametri mancanti" }, { status: 400 });
        }

        if (!ethers.utils.isAddress(userWallet)) {
            return NextResponse.json({ success: false, error: "Wallet non valido" }, { status: 400 });
        }
        userWallet = userWallet.toLowerCase();
        const cleanTxHash = txHash.toLowerCase();

        let points = 0;
        if (type === "swap") points = 100;
        else if (type === "limit") points = 200;
        else return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

        // 1. Lock atomico immediato: prenota l'hash per 120s con NX. Blocca all'istante chiamate concorrenti/duplicate.
        const claimKey = `claim_tx:${cleanTxHash}`;
        const lockAcquired = await redis.set(claimKey, "pending", { nx: true, ex: 120 });
        if (!lockAcquired) {
            return NextResponse.json({ success: false, error: "Transazione già riscattata o in elaborazione" }, { status: 400 });
        }

        try {
            // --- 🚨 FIX RACE CONDITION: SMART POLLING 🚨 ---
            let receipt = null;
            const maxRetries = 4; // Fino a 4 tentativi
            const delayMs = 3000; // 3 secondi di pausa tra i tentativi (totale ~12 secondi)

            for (let i = 0; i < maxRetries; i++) {
                const rpcResponse = await fetch(RPC_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: "2.0",
                        id: 1,
                        method: "eth_getTransactionReceipt",
                        params: [cleanTxHash]
                    })
                });
                
                const rpcData = await rpcResponse.json();
                receipt = rpcData.result;

                if (receipt) {
                    break; // La ricevuta esiste, il blocco è stato propagato!
                }
                
                // Se non esiste ancora, aspettiamo prima del prossimo ciclo
                console.log(`[Attempt ${i + 1}] Transazione non ancora trovata sulla BSC, attendo...`);
                await sleep(delayMs);
            }

            if (!receipt || parseInt(receipt.status, 16) !== 1) {
                // Rilascia la prenotazione temporanea per consentire il retry se la tx era solo in ritardo
                await redis.del(claimKey);
                return NextResponse.json({ success: false, error: "Transazione fallita o non confermata dal network" }, { status: 400 });
            }

            if (receipt.from.toLowerCase() !== userWallet) {
                // Rilascia la prenotazione
                await redis.del(claimKey);
                return NextResponse.json({ success: false, error: "La transazione non appartiene a questo wallet" }, { status: 403 });
            }

            // 2. Conferma definitiva: transazione validata, lock esteso a 30 giorni
            await redis.set(claimKey, "true", { ex: 2592000 });

        } catch (verifyError: any) {
            console.error("RPC Manual Fetch Error:", verifyError);
            // In caso di errore RPC temporaneo, rilascia il lock per consentire il retry
            await redis.del(claimKey);
            return NextResponse.json({ success: false, error: "Errore durante la verifica blockchain" }, { status: 503 });
        }

        await redis.zincrby("leaderboard:points", points, userWallet);

        let parent = await redis.get(`ref:parent:${userWallet}`);
        if (!parent && body.referrerWallet && ethers.utils.isAddress(body.referrerWallet)) {
            const refCandidate = body.referrerWallet.toLowerCase();
            if (refCandidate !== userWallet) {
                await redis.set(`ref:parent:${userWallet}`, refCandidate);
                await redis.sadd(`ref:children:${refCandidate}`, userWallet);
                parent = refCandidate;
                console.log(`🔗 Referral auto-linked from dex-reward: ${userWallet} -> ${refCandidate}`);
            }
        }

        if (parent) {
            const bonus = points * 0.1;
            await redis.zincrby("leaderboard:points", bonus, parent as string);
            await redis.incrbyfloat(`ref:earnings:${parent}`, bonus);
        }

        return NextResponse.json({ success: true, pointsAdded: points });

    } catch (error) {
        console.error("General Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
