'use client';

// ============================================================
//  app/vaults/VaultsClient.tsx
//
//  FIX rispetto alla versione precedente:
//  1. FEE_RECIPIENT ora è un address valido a 42 caratteri
//  2. `sender` passato alla POST /api/portals/deposit
//  3. `amount` convertito in wei con parseUnits prima di inviare
//  4. Flusso approvazione ERC-20: se l'API restituisce approveTx,
//     viene firmata e attesa PRIMA della transazione di deposit
//  5. `gasLimit` propagato se fornito dall'API
//  6. `tokenSymbol` mostrato in UI per chiarezza
// ============================================================

import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { vaultsList } from '../../config/vaults';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// ⚠️  Sostituire con il proprio address a 42 caratteri (0x + 40 hex)
const FEE_RECIPIENT = '0xafF5340ECFaf7ce049261f193f5FED6BDF04E7';
//                                                              ^^^^ fix: 2 caratteri mancavano
const FEE_BPS = 100; // 100 basis points = 1%

// ─── Styled Components ───────────────────────────────────────

const PageWrapper = styled.div`
  min-height: 100vh;
  padding-left: 260px;
  background: #030014;
  color: white;
  @media (max-width: 1024px) {
    padding-left: 0;
    padding-top: 60px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 32px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(168, 85, 247, 0.15);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.2s;
  &:hover {
    border-color: rgba(168, 85, 247, 0.4);
  }
`;

const VaultName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

const Protocol = styled.p`
  font-size: 12px;
  color: #94a3b8;
  margin: 0;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
`;

const Value = styled.span`
  font-weight: 600;
`;

const BalanceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 10px 14px;
`;

const DepositBtn = styled.button`
  background: #a855f7;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: opacity 0.15s;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ─── Step di stato per il flusso deposit ─────────────────────
type DepositStep = 'idle' | 'approving' | 'depositing' | 'done' | 'error';

// ─── Componente principale ────────────────────────────────────

export default function VaultsClient() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [address, setAddress] = useState<string | undefined>();

  const [selectedVault, setSelectedVault] = useState<(typeof vaultsList)[0] | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositStep, setDepositStep] = useState<DepositStep>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [balances, setBalances] = useState<Record<string, string>>({});
  const [loadingBalances, setLoadingBalances] = useState(false);

  // Sync address da wallet
  useEffect(() => {
    setAddress(wallet?.accounts[0]?.address);
  }, [wallet]);

  // Fetch saldi token per ogni vault
  useEffect(() => {
    if (!address || !wallet) return;

    const fetchBalances = async () => {
      setLoadingBalances(true);
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
      const newBalances: Record<string, string> = {};

      for (const v of vaultsList) {
        try {
          if (v.token === '0x0000000000000000000000000000000000000000') {
            // BNB nativo
            const bal = await provider.getBalance(address);
            newBalances[v.id] = ethers.utils.formatEther(bal);
          } else {
            // ERC-20
            const erc20 = new ethers.Contract(
              v.token,
              ['function balanceOf(address) view returns (uint256)'],
              provider
            );
            const bal: ethers.BigNumber = await erc20.balanceOf(address);
            newBalances[v.id] = ethers.utils.formatUnits(bal, v.tokenDecimals);
          }
        } catch (err) {
          console.error(`Errore saldo per ${v.name}:`, err);
          newBalances[v.id] = '0';
        }
      }

      setBalances(newBalances);
      setLoadingBalances(false);
    };

    fetchBalances();
  }, [address, wallet]);

  // ─── Handler deposit ───────────────────────────────────────
  const handleDeposit = useCallback(async () => {
    if (!selectedVault || !depositAmount || !address || !wallet) return;

    const amountFloat = parseFloat(depositAmount);
    if (isNaN(amountFloat) || amountFloat <= 0) return;

    setDepositStep('idle');
    setTxHash(null);
    setErrorMsg(null);

    try {
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
      const signer = provider.getSigner();

      // FIX #3: converti in wei PRIMA di mandare all'API
      const amountWei = ethers.utils
        .parseUnits(depositAmount, selectedVault.tokenDecimals)
        .toString();

      // ── Chiamata API backend ─────────────────────────────
      const res = await fetch('/api/portals/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vaultId: selectedVault.id,
          amount: amountWei,               // FIX #3: wei, non stringa raw
          tokenIn: selectedVault.token,
          sender: address,                 // FIX #4: sender obbligatorio
          feeRecipient: FEE_RECIPIENT,
          feePercentage: FEE_BPS,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.tx) {
        throw new Error(data.error ?? 'Errore nella costruzione della transazione');
      }

      // FIX #5: flusso approvazione ERC-20 PRIMA del deposit
      if (data.approveTx) {
        setDepositStep('approving');

        const approveTxResponse = await signer.sendTransaction({
          to: data.approveTx.to,
          data: data.approveTx.data,
          gasLimit: data.approveTx.gasLimit
            ? ethers.BigNumber.from(data.approveTx.gasLimit)
            : undefined,
        });

        await approveTxResponse.wait();
        // Approvazione confermata, si procede col deposit
      }

      // ── Transazione di deposit ────────────────────────────
      setDepositStep('depositing');

      const depositTx = await signer.sendTransaction({
        to: data.tx.to,
        data: data.tx.data,
        value: data.tx.value
          ? ethers.BigNumber.from(data.tx.value)
          : undefined,
        // FIX #7: gasLimit dall'API se disponibile
        gasLimit: data.tx.gasLimit
          ? ethers.BigNumber.from(data.tx.gasLimit)
          : undefined,
      });

      const receipt = await depositTx.wait();
      setTxHash(receipt.transactionHash);
      setDepositStep('done');

      // Aggiorna saldo dopo il deposit
      if (selectedVault.token === '0x0000000000000000000000000000000000000000') {
        const bal = await provider.getBalance(address);
        setBalances((prev) => ({
          ...prev,
          [selectedVault.id]: ethers.utils.formatEther(bal),
        }));
      } else {
        const erc20 = new ethers.Contract(
          selectedVault.token,
          ['function balanceOf(address) view returns (uint256)'],
          provider
        );
        const bal: ethers.BigNumber = await erc20.balanceOf(address);
        setBalances((prev) => ({
          ...prev,
          [selectedVault.id]: ethers.utils.formatUnits(bal, selectedVault.tokenDecimals),
        }));
      }
    } catch (err: any) {
      console.error('[handleDeposit]', err);
      const msg: string =
        err?.reason ?? err?.data?.message ?? err?.message ?? 'Errore sconosciuto';
      setErrorMsg(msg);
      setDepositStep('error');
    }
  }, [selectedVault, depositAmount, address, wallet]);

  // ─── Reset modal ──────────────────────────────────────────
  const closeModal = () => {
    setSelectedVault(null);
    setDepositAmount('');
    setDepositStep('idle');
    setTxHash(null);
    setErrorMsg(null);
  };

  // ─── Sezione wallet nell'header ───────────────────────────
  const walletSection = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {!address ? (
        <button
          onClick={() => connect()}
          style={{
            background: '#a855f7',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#94a3b8' }}>
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            onClick={() => wallet && disconnect(wallet)}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );

  // ─── Testo step deposito ──────────────────────────────────
  const depositBtnLabel = () => {
    if (depositStep === 'approving') return 'Approvazione in corso...';
    if (depositStep === 'depositing') return 'Deposit in corso...';
    return 'Conferma Deposito';
  };
  const isDepositBusy = depositStep === 'approving' || depositStep === 'depositing';

  // ─── Render ───────────────────────────────────────────────
  return (
    <>
      <Header activePage="/vaults" walletSection={walletSection} />
      <PageWrapper>
        <Container>
          {/* Titolo */}
          <div style={{ marginBottom: '32px' }}>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 800,
                margin: 0,
                background: 'linear-gradient(to bottom, #fff, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Vaults (Portals.fi)
            </h1>
            <p style={{ color: '#94a3b8', marginTop: '8px' }}>
              I migliori vault su BNB Chain con APY e TVL reali. Collega il wallet per
              depositare.
            </p>
          </div>

          {/* Griglia vault */}
          <CardGrid>
            {vaultsList.map((vault) => (
              <Card key={vault.id}>
                <div>
                  <VaultName>{vault.name}</VaultName>
                  <Protocol>{vault.protocol}</Protocol>
                </div>

                <StatsRow>
                  <Stat>
                    <Label>APY</Label>
                    <Value style={{ color: vault.apy > 1 ? '#22c55e' : 'white' }}>
                      {vault.apy.toFixed(2)}%
                    </Value>
                  </Stat>
                  <Stat>
                    <Label>TVL</Label>
                    <Value>
                      {vault.tvl >= 1_000_000
                        ? `$${(vault.tvl / 1_000_000).toFixed(2)}M`
                        : `$${(vault.tvl / 1_000).toFixed(1)}k`}
                    </Value>
                  </Stat>
                  <Stat>
                    <Label>Token</Label>
                    <Value style={{ fontSize: '13px' }}>{vault.tokenSymbol}</Value>
                  </Stat>
                </StatsRow>

                {address && (
                  <BalanceRow>
                    <span style={{ fontSize: 13, color: '#94a3b8' }}>
                      Saldo {vault.tokenSymbol}
                    </span>
                    <span style={{ fontWeight: 600 }}>
                      {loadingBalances
                        ? '...'
                        : parseFloat(balances[vault.id] || '0').toFixed(6)}
                    </span>
                  </BalanceRow>
                )}

                <DepositBtn
                  onClick={() => {
                    setDepositAmount('');
                    setDepositStep('idle');
                    setSelectedVault(vault);
                  }}
                  disabled={!address}
                >
                  {address ? 'Deposita' : 'Connetti il wallet'}
                </DepositBtn>
              </Card>
            ))}
          </CardGrid>

          {/* ── Modal deposit ── */}
          {selectedVault && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
              }}
              onClick={closeModal}
            >
              <div
                style={{
                  background: '#0f0f1a',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  borderRadius: 20,
                  padding: 32,
                  maxWidth: 440,
                  width: '100%',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                  Deposita in {selectedVault.name}
                </h2>
                <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>
                  Token di input:{' '}
                  <strong style={{ color: 'white' }}>{selectedVault.tokenSymbol}</strong>
                </p>

                {/* Saldo disponibile */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#94a3b8',
                    fontSize: 13,
                    marginBottom: 10,
                  }}
                >
                  <span>Saldo disponibile</span>
                  <span style={{ color: 'white', fontWeight: 600 }}>
                    {parseFloat(balances[selectedVault.id] || '0').toFixed(6)}{' '}
                    {selectedVault.tokenSymbol}
                  </span>
                </div>

                {/* Input importo */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    step="any"
                    min="0"
                    disabled={isDepositBusy}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderRadius: 12,
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      background: 'rgba(0,0,0,0.3)',
                      color: 'white',
                      fontSize: 16,
                    }}
                  />
                  <button
                    onClick={() => setDepositAmount(balances[selectedVault.id] || '0')}
                    disabled={isDepositBusy}
                    style={{
                      background: 'rgba(168, 85, 247, 0.2)',
                      color: '#a855f7',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    MAX
                  </button>
                </div>

                {/* Info fee */}
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 20, lineHeight: 1.6 }}>
                  <div>Commissione: {(FEE_BPS / 100).toFixed(2)}% (una tantum)</div>
                  <div>
                    Destinatario: {FEE_RECIPIENT.slice(0, 6)}...{FEE_RECIPIENT.slice(-4)}
                  </div>
                </div>

                {/* Step progress */}
                {depositStep === 'approving' && (
                  <div
                    style={{
                      background: 'rgba(234,179,8,0.1)',
                      border: '1px solid rgba(234,179,8,0.3)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      fontSize: 13,
                      color: '#fbbf24',
                      marginBottom: 16,
                    }}
                  >
                    ⏳ Passo 1/2 — Approvazione ERC-20 in corso, attendi conferma...
                  </div>
                )}
                {depositStep === 'depositing' && (
                  <div
                    style={{
                      background: 'rgba(168,85,247,0.1)',
                      border: '1px solid rgba(168,85,247,0.3)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      fontSize: 13,
                      color: '#c084fc',
                      marginBottom: 16,
                    }}
                  >
                    ⏳ Passo 2/2 — Deposit in corso, attendi conferma...
                  </div>
                )}
                {depositStep === 'done' && txHash && (
                  <div
                    style={{
                      background: 'rgba(34,197,94,0.1)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      fontSize: 13,
                      color: '#4ade80',
                      marginBottom: 16,
                    }}
                  >
                    ✅ Deposit completato!{' '}
                    <a
                      href={`https://bscscan.com/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#4ade80', textDecoration: 'underline' }}
                    >
                      Vedi su BscScan
                    </a>
                  </div>
                )}
                {depositStep === 'error' && errorMsg && (
                  <div
                    style={{
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      fontSize: 12,
                      color: '#f87171',
                      marginBottom: 16,
                      wordBreak: 'break-word',
                    }}
                  >
                    ❌ {errorMsg}
                  </div>
                )}

                {/* Pulsanti */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={closeModal}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderRadius: 12,
                      border: 'none',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: '#334155',
                      color: 'white',
                    }}
                  >
                    {depositStep === 'done' ? 'Chiudi' : 'Annulla'}
                  </button>

                  {depositStep !== 'done' && (
                    <button
                      onClick={handleDeposit}
                      disabled={
                        isDepositBusy ||
                        !depositAmount ||
                        parseFloat(depositAmount) <= 0
                      }
                      style={{
                        flex: 1,
                        padding: 12,
                        borderRadius: 12,
                        border: 'none',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: depositStep === 'error' ? '#f59e0b' : '#22c55e',
                        color: 'white',
                        opacity:
                          isDepositBusy || !depositAmount || parseFloat(depositAmount) <= 0
                            ? 0.5
                            : 1,
                        transition: 'opacity 0.15s',
                      }}
                    >
                      {depositStep === 'error' ? 'Riprova' : depositBtnLabel()}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Container>
        <Footer />
      </PageWrapper>
    </>
  );
}
