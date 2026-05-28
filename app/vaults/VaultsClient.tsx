'use client';

import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { vaultsList } from '../../config/vaults';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const FEE_RECIPIENT = '0xafF5340ECFaf7ce049261f193f5FED6BDF04E7';

const COMMON_TOKENS = [
  { symbol: 'BNB', address: '0x0000000000000000000000000000000000000000', decimals: 18 },
  { symbol: 'USDT', address: '0x55d398326f99059fF775485246999027B3197955', decimals: 18 },
  { symbol: 'USDC', address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', decimals: 18 },
  { symbol: 'WBNB', address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', decimals: 18 },
  { symbol: 'BTCB', address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', decimals: 18 },
  { symbol: 'ETH', address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', decimals: 18 },
  { symbol: 'CAKE', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', decimals: 18 },
  { symbol: 'XRP', address: '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE', decimals: 18 },
  { symbol: 'AAVE', address: '0xfb6115445Bff7b52FeB98650C87f44907E58f802', decimals: 18 },
  { symbol: 'DAI', address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', decimals: 18 },
  { symbol: 'UNI', address: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1', decimals: 18 },
  { symbol: 'LINK', address: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD', decimals: 18 },
  { symbol: 'TUSD', address: '0x14016E85a25aeb13065688cAFB43044C2ef86784', decimals: 18 },
  { symbol: 'HAY', address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5', decimals: 18 },
  { symbol: 'CYC', address: '0x5845684b49aef79a5c0f887f50401c247dca7ac6', decimals: 18 },
];

const getFeeBps = (apy: number): number => {
  if (apy < 0.5) return 5;
  if (apy < 2) return 10;
  if (apy < 5) return 25;
  if (apy < 20) return 50;
  if (apy < 50) return 100;
  return 150;
};
const getFeePercent = (apy: number): string => (getFeeBps(apy) / 100).toFixed(2);

/* --- Styled Components --- */
const PageWrapper = styled.div`
  min-height: 100vh; padding-left: 260px; background: #030014; color: white;
  @media (max-width: 1024px) { padding-left: 0; padding-top: 60px; }
`;
const Container = styled.div` max-width: 1200px; margin: 0 auto; padding: 40px 20px; `;
const CardGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 32px; `;
const Card = styled.div`
  background: rgba(255,255,255,0.02); border: 1px solid rgba(168,85,247,0.15); border-radius: 20px; padding: 24px;
  display: flex; flex-direction: column; gap: 16px; transition: border-color 0.2s;
  &:hover { border-color: rgba(168,85,247,0.4); }
`;
const VaultName = styled.h3` font-size: 18px; font-weight: 700; margin: 0; `;
const Protocol = styled.p` font-size: 12px; color: #94a3b8; margin: 0; `;
const StatsRow = styled.div` display: flex; justify-content: space-between; font-size: 14px; `;
const Stat = styled.div` display: flex; flex-direction: column; `;
const Label = styled.span` font-size: 11px; color: #64748b; text-transform: uppercase; `;
const Value = styled.span` font-weight: 600; `;
const ActionBtn = styled.button`
  background: #a855f7; color: white; border: none; border-radius: 12px; padding: 12px; font-weight: 600;
  cursor: pointer; width: 100%; transition: opacity 0.15s;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
const RedeemBtn = styled(ActionBtn)` background: #ef4444; `;

type DepositStep = 'idle' | 'approving' | 'depositing' | 'done' | 'error';

export default function VaultsClient() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [address, setAddress] = useState<string | undefined>();
  const [selectedVault, setSelectedVault] = useState<any | null>(null);
  const [selectedToken, setSelectedToken] = useState(COMMON_TOKENS[0]);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositStep, setDepositStep] = useState<DepositStep>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [vaultBalances, setVaultBalances] = useState<Record<string, string>>({});
  const [loadingVaultBalances, setLoadingVaultBalances] = useState(false);
  const [redeemMode, setRedeemMode] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState('');

  useEffect(() => { setAddress(wallet?.accounts[0]?.address); }, [wallet]);

  // Carica i saldi dei token di vault (quelli che hai ricevuto depositando)
  useEffect(() => {
    if (!address || !wallet) return;
    const fetchVaultBalances = async () => {
      setLoadingVaultBalances(true);
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
      const newBalances: Record<string, string> = {};
      for (const v of vaultsList) {
        try {
          const vaultTokenAddr = v.id.split(':')[1]; // estrae 0x... dal formato bsc:0x...
          if (!ethers.utils.isAddress(vaultTokenAddr)) continue;
          const erc20 = new ethers.Contract(vaultTokenAddr, ['function balanceOf(address) view returns (uint256)'], provider);
          const bal = await erc20.balanceOf(address);
          if (!bal.isZero()) {
            newBalances[v.id] = ethers.utils.formatUnits(bal, 18); // assumiamo 18 decimali per i token di vault
          }
        } catch { /* ignoriamo */ }
      }
      setVaultBalances(newBalances);
      setLoadingVaultBalances(false);
    };
    fetchVaultBalances();
  }, [address, wallet]);

  // Carica saldo del token selezionato (per deposito)
  useEffect(() => {
    if (!address || !wallet) return;
    const fetchBalance = async () => {
      setLoadingBalance(true);
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
      try {
        if (selectedToken.address === '0x0000000000000000000000000000000000000000') {
          const bal = await provider.getBalance(address);
          setBalance(ethers.utils.formatEther(bal));
        } else {
          const erc20 = new ethers.Contract(selectedToken.address, ['function balanceOf(address) view returns (uint256)'], provider);
          const bal = await erc20.balanceOf(address);
          setBalance(ethers.utils.formatUnits(bal, selectedToken.decimals));
        }
      } catch { setBalance('0'); }
      setLoadingBalance(false);
    };
    fetchBalance();
  }, [address, wallet, selectedToken]);

  const openModal = (vault: any) => {
    setSelectedVault(vault);
    setDepositAmount('');
    setDepositStep('idle');
    setRedeemMode(false);
    const found = COMMON_TOKENS.find(t => t.symbol === vault.suggestedToken);
    setSelectedToken(found || COMMON_TOKENS[0]);
  };

  const openRedeem = (vault: any) => {
    setSelectedVault(vault);
    setRedeemAmount('');
    setDepositStep('idle');
    setRedeemMode(true);
  };

  const handleDeposit = useCallback(async () => {
    if (!selectedVault || !depositAmount || !address || !wallet) return;
    if (isNaN(parseFloat(depositAmount)) || parseFloat(depositAmount) <= 0) return;

    setDepositStep('idle'); setTxHash(null); setErrorMsg(null);
    try {
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
      const signer = provider.getSigner();
      const amountWei = ethers.utils.parseUnits(depositAmount, selectedToken.decimals).toString();
      const feeBps = getFeeBps(selectedVault.apy);

      const res = await fetch('/api/portals/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vaultId: selectedVault.id,
          amount: amountWei,
          tokenIn: selectedToken.address,
          sender: address,
          feeRecipient: FEE_RECIPIENT,
          feePercentage: feeBps,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.tx) throw new Error(data.error || 'Errore');

      if (data.approveTx) {
        setDepositStep('approving');
        const approveTxResponse = await signer.sendTransaction({
          to: data.approveTx.to, data: data.approveTx.data,
          gasLimit: data.approveTx.gasLimit ? ethers.BigNumber.from(data.approveTx.gasLimit) : undefined,
        });
        await approveTxResponse.wait();
      }
      setDepositStep('depositing');
      const depositTx = await signer.sendTransaction({
        to: data.tx.to, data: data.tx.data,
        value: data.tx.value ? ethers.BigNumber.from(data.tx.value) : undefined,
        gasLimit: data.tx.gasLimit ? ethers.BigNumber.from(data.tx.gasLimit) : undefined,
      });
      const receipt = await depositTx.wait();
      setTxHash(receipt.transactionHash);
      setDepositStep('done');
    } catch (err: any) {
      setErrorMsg(err?.reason || err?.data?.message || err?.message || 'Errore sconosciuto');
      setDepositStep('error');
    }
  }, [selectedVault, depositAmount, selectedToken, address, wallet]);

  const handleRedeem = useCallback(async () => {
    if (!selectedVault || !redeemAmount || !address || !wallet) return;
    const amountFloat = parseFloat(redeemAmount);
    if (isNaN(amountFloat) || amountFloat <= 0) return;

    setDepositStep('idle'); setTxHash(null); setErrorMsg(null);
    try {
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
      const signer = provider.getSigner();
      const vaultToken = selectedVault.id.split(':')[1];
      const outToken = COMMON_TOKENS.find(t => t.symbol === selectedVault.suggestedToken) || COMMON_TOKENS[0];
      const amountWei = ethers.utils.parseUnits(redeemAmount, 18).toString();

      const res = await fetch('/api/portals/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vaultId: `bsc:${outToken.address}`,
          amount: amountWei,
          tokenIn: vaultToken,
          sender: address,
          feeRecipient: FEE_RECIPIENT,
          feePercentage: getFeeBps(selectedVault.apy),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.tx) throw new Error(data.error || 'Errore');

      if (data.approveTx) {
        setDepositStep('approving');
        const approveTxResponse = await signer.sendTransaction({
          to: data.approveTx.to, data: data.approveTx.data,
          gasLimit: data.approveTx.gasLimit ? ethers.BigNumber.from(data.approveTx.gasLimit) : undefined,
        });
        await approveTxResponse.wait();
      }
      setDepositStep('depositing');
      const redeemTx = await signer.sendTransaction({
        to: data.tx.to, data: data.tx.data,
        value: data.tx.value ? ethers.BigNumber.from(data.tx.value) : undefined,
        gasLimit: data.tx.gasLimit ? ethers.BigNumber.from(data.tx.gasLimit) : undefined,
      });
      const receipt = await redeemTx.wait();
      setTxHash(receipt.transactionHash);
      setDepositStep('done');
    } catch (err: any) {
      setErrorMsg(err?.reason || err?.data?.message || err?.message || 'Errore sconosciuto');
      setDepositStep('error');
    }
  }, [selectedVault, redeemAmount, address, wallet]);

  const walletSection = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {!address ? (
        <button onClick={() => connect()} style={{ background: '#a855f7', color: 'white', border: 'none', borderRadius: '12px', padding: '10px 20px', fontWeight: 600, cursor: 'pointer' }}>
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#94a3b8' }}>{address.slice(0, 6)}...{address.slice(-4)}</span>
          <button onClick={() => wallet && disconnect(wallet)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }}>Disconnect</button>
        </div>
      )}
    </div>
  );

  const depositBtnLabel = () => {
    if (depositStep === 'approving') return 'Approvazione in corso...';
    if (depositStep === 'depositing') return 'Deposit in corso...';
    return 'Conferma Deposito';
  };
  const isBusy = depositStep === 'approving' || depositStep === 'depositing';

  return (
    <>
      <Header activePage="/vaults" walletSection={walletSection} />
      <PageWrapper>
        <Container>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0, background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vaults (Portals.fi)</h1>
          <p style={{ color: '#94a3b8', marginTop: '8px' }}>Deposita e preleva dai migliori vault su BNB Chain.</p>

          {/* I miei depositi */}
          {address && Object.keys(vaultBalances).length > 0 && (
            <div style={{ marginTop: 32, marginBottom: 32 }}>
              <h2 style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>I miei depositi</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {Object.entries(vaultBalances).map(([vaultId, bal]) => {
                  const vault = vaultsList.find(v => v.id === vaultId);
                  if (!vault || parseFloat(bal) <= 0) return null;
                  return (
                    <div key={vaultId} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{vault.name}</div>
                        <div style={{ fontSize: 13, color: '#94a3b8' }}>{parseFloat(bal).toFixed(6)} tokens</div>
                      </div>
                      <RedeemBtn onClick={() => openRedeem(vault)}>Preleva</RedeemBtn>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <CardGrid>
            {vaultsList.map((vault: any) => (
              <Card key={vault.id}>
                <div>
                  <VaultName>{vault.name}</VaultName>
                  <Protocol>{vault.protocol}</Protocol>
                </div>
                <StatsRow>
                  <Stat><Label>APY</Label><Value style={{ color: vault.apy > 1 ? '#22c55e' : 'white' }}>{vault.apy.toFixed(2)}%</Value></Stat>
                  <Stat><Label>TVL</Label><Value>${(vault.tvl / 1e6).toFixed(2)}M</Value></Stat>
                  <Stat><Label>Fee</Label><Value style={{ fontSize: '13px', color: '#a78bfa' }}>{getFeePercent(vault.apy)}%</Value></Stat>
                </StatsRow>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                  Token suggerito: <strong style={{ color: '#a855f7' }}>{vault.suggestedToken}</strong>
                </div>
                <ActionBtn onClick={() => openModal(vault)} disabled={!address}>
                  {address ? 'Deposita' : 'Connetti il wallet'}
                </ActionBtn>
              </Card>
            ))}
          </CardGrid>

          {/* Modale deposito */}
          {(selectedVault && !redeemMode) && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setSelectedVault(null)}>
              <div style={{ background: '#0f0f1a', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: 20, padding: 32, maxWidth: 440, width: '100%' }} onClick={e => e.stopPropagation()}>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Deposita in {selectedVault.name}</h2>
                <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>
                  Token consigliato: <strong style={{ color: '#a855f7' }}>{selectedVault.suggestedToken}</strong>
                </p>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  {COMMON_TOKENS.map(t => (
                    <button key={t.address} onClick={() => setSelectedToken(t)}
                      style={{
                        padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
                        background: selectedToken.address === t.address ? '#a855f7' : 'rgba(168,85,247,0.15)',
                        color: 'white'
                      }}>{t.symbol}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>
                  <span>Saldo disponibile</span>
                  <span style={{ color: 'white', fontWeight: 600 }}>{loadingBalance ? '...' : parseFloat(balance).toFixed(6)} {selectedToken.symbol}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                  <input type="number" placeholder="0.0" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} step="any" min="0" disabled={isBusy}
                    style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid rgba(168, 85, 247, 0.3)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: 16 }} />
                  <button onClick={() => setDepositAmount(balance)} disabled={isBusy}
                    style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer' }}>MAX</button>
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 20, lineHeight: 1.6 }}>
                  <div>Commissione: <strong style={{ color: '#c084fc' }}>{getFeePercent(selectedVault.apy)}%</strong> (una tantum)</div>
                  <div>APY: {selectedVault.apy.toFixed(2)}%</div>
                  <div>Destinatario fee: {FEE_RECIPIENT.slice(0, 6)}...{FEE_RECIPIENT.slice(-4)}</div>
                </div>
                {depositStep === 'approving' && <div style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#fbbf24', marginBottom: 16 }}>⏳ Approvazione in corso...</div>}
                {depositStep === 'depositing' && <div style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#c084fc', marginBottom: 16 }}>⏳ Deposit in corso...</div>}
                {depositStep === 'done' && txHash && <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#4ade80', marginBottom: 16 }}>✅ Completato! <a href={`https://bscscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'underline' }}>Vedi su BscScan</a></div>}
                {depositStep === 'error' && errorMsg && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#f87171', marginBottom: 16, wordBreak: 'break-word' }}>❌ {errorMsg}</div>}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setSelectedVault(null)} style={{ flex: 1, padding: 12, borderRadius: 12, border: 'none', fontWeight: 600, cursor: 'pointer', background: '#334155', color: 'white' }}>Annulla</button>
                  {depositStep !== 'done' && (
                    <button onClick={handleDeposit} disabled={isBusy || !depositAmount || parseFloat(depositAmount) <= 0}
                      style={{ flex: 1, padding: 12, borderRadius: 12, border: 'none', fontWeight: 600, cursor: 'pointer', background: depositStep === 'error' ? '#f59e0b' : '#22c55e', color: 'white', opacity: (isBusy || !depositAmount || parseFloat(depositAmount) <= 0) ? 0.5 : 1 }}>
                      {depositStep === 'error' ? 'Riprova' : depositBtnLabel()}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Modale prelievo */}
          {(selectedVault && redeemMode) && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => { setSelectedVault(null); setRedeemMode(false); }}>
              <div style={{ background: '#0f0f1a', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: 20, padding: 32, maxWidth: 440, width: '100%' }} onClick={e => e.stopPropagation()}>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Preleva da {selectedVault.name}</h2>
                <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>
                  Riceverai: <strong style={{ color: 'white' }}>{selectedVault.suggestedToken}</strong>
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>
                  <span>Saldo disponibile</span>
                  <span style={{ color: 'white', fontWeight: 600 }}>{parseFloat(vaultBalances[selectedVault.id] || '0').toFixed(6)} tokens</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                  <input type="number" placeholder="0.0" value={redeemAmount} onChange={e => setRedeemAmount(e.target.value)} step="any" min="0" disabled={isBusy}
                    style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid rgba(168, 85, 247, 0.3)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: 16 }} />
                  <button onClick={() => setRedeemAmount(vaultBalances[selectedVault.id] || '0')} disabled={isBusy}
                    style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer' }}>MAX</button>
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 20, lineHeight: 1.6 }}>
                  <div>Commissione: <strong style={{ color: '#c084fc' }}>{getFeePercent(selectedVault.apy)}%</strong> (una tantum)</div>
                  <div>APY: {selectedVault.apy.toFixed(2)}%</div>
                  <div>Destinatario fee: {FEE_RECIPIENT.slice(0, 6)}...{FEE_RECIPIENT.slice(-4)}</div>
                </div>
                {depositStep === 'approving' && <div style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#fbbf24', marginBottom: 16 }}>⏳ Approvazione in corso...</div>}
                {depositStep === 'depositing' && <div style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#c084fc', marginBottom: 16 }}>⏳ Prelievo in corso...</div>}
                {depositStep === 'done' && txHash && <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#4ade80', marginBottom: 16 }}>✅ Completato! <a href={`https://bscscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'underline' }}>Vedi su BscScan</a></div>}
                {depositStep === 'error' && errorMsg && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#f87171', marginBottom: 16, wordBreak: 'break-word' }}>❌ {errorMsg}</div>}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => { setSelectedVault(null); setRedeemMode(false); }} style={{ flex: 1, padding: 12, borderRadius: 12, border: 'none', fontWeight: 600, cursor: 'pointer', background: '#334155', color: 'white' }}>Annulla</button>
                  {depositStep !== 'done' && (
                    <button onClick={handleRedeem} disabled={isBusy || !redeemAmount || parseFloat(redeemAmount) <= 0}
                      style={{ flex: 1, padding: 12, borderRadius: 12, border: 'none', fontWeight: 600, cursor: 'pointer', background: '#ef4444', color: 'white', opacity: (isBusy || !redeemAmount || parseFloat(redeemAmount) <= 0) ? 0.5 : 1 }}>
                      {depositStep === 'error' ? 'Riprova' : depositStep === 'approving' ? 'Approvazione in corso...' : depositStep === 'depositing' ? 'Prelievo in corso...' : 'Conferma Prelievo'}
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
