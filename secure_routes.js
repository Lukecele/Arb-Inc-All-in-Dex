const fs = require('fs');
const path = require('path');

const filesToPatch = [
    './app/api/rewards/claim/route.ts',
    './app/api/rewards/stats/route.ts',
    './app/api/stats/route.ts',
    './app/api/leaderboard/route.ts'
];

const ETH_CHECK_JSON = `
        if (!wallet || typeof wallet !== "string") {
            return NextResponse.json({ error: "Missing or invalid wallet parameter" }, { status: 400 });
        }
        if (!(ethers as any).utils.isAddress(wallet)) {
            return NextResponse.json({ error: "Invalid Ethereum address format" }, { status: 400 });
        }
`;

const ETH_CHECK_URL = `
        if (!wallet || typeof wallet !== "string") {
            return new Response(JSON.stringify({ error: "Missing or invalid wallet parameter" }), { status: 400 });
        }
        // Utilizziamo un check Regex se ethers non e' importato, altrimenti usiamo ethers
        if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
            return new Response(JSON.stringify({ error: "Invalid Ethereum address format" }), { status: 400 });
        }
`;

for (const file of filesToPatch) {
    if (!fs.existsSync(file)) {
        console.log(`⚠️ File non trovato: ${file} (Skippato)`);
        continue;
    }

    let content = fs.readFileSync(file, 'utf8');
    let patched = false;

    // Patch per JSON body (es: const { wallet } = await request.json();)
    if (content.includes('const { wallet } = await request.json();') && !content.includes('isAddress(wallet)')) {
        content = content.replace(
            /const\s+\{\s*wallet\s*\}\s*=\s*await\s+request\.json\(\);/g,
            `const { wallet } = await request.json();\n${ETH_CHECK_JSON}`
        );
        patched = true;
    }

    // Patch per URL params (es: const wallet = searchParams.get("wallet");)
    if (content.includes('searchParams.get("wallet")') && !content.includes('Invalid Ethereum address')) {
        content = content.replace(
            /const\s+wallet\s*=\s*searchParams\.get\("wallet"\)(?:\?.toLowerCase\(\))?;/g,
            `const rawWallet = searchParams.get("wallet");\n        let wallet = rawWallet ? rawWallet.toLowerCase() : null;\n${ETH_CHECK_URL}`
        );
        patched = true;
    }

    if (patched) {
        fs.writeFileSync(file, content);
        console.log(`✅ SIGILLATO CON SUCCESSO: ${file}`);
    } else {
        console.log(`ℹ️ GIA' SICURO o pattern non trovato: ${file}`);
    }
}

console.log("\n🛡️ Fatto! Tutti gli endpoint principali ora rifiutano indirizzi non validi.");
