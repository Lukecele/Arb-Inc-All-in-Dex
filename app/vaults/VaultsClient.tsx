'use client';

import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { vaultsList } from '@/config/vaults';

const FEE_RECIPIENT = '0xafF5340ECFaf7ce049261f193f5FED6BDF04E7';
const BSC_CHAIN_ID = 56;

/* ---------- styled-components (palette del progetto) ---------- */
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
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(to bottom, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const PillButton = styled.button<{ $primary?: boolean }>`
  background: ${(p) => (p.$primary ? '#a855f7' : 'rgba(255,255,255,0.05)')};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
  &:hover { opacity: 0.85; }
`;
const AddressBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: monospace;
  font-size: 12px;
  color: #94a3b8;
`;
const DisconnectBtn = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
`;
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;
const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(168, 85, 247, 0.15);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: 0.2s;
  &:hover { border-color: rgba(168, 85, 247, 0.4); }
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
  background: rgba(0,0,0,0.2);
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
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const Modal = styled.div`
  background: #121212;
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 20px;
  padding: 32px;
  max-width: 420px;
  width: 100%;
`;
const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
`;
const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  background: rgba(0,0,0,0.3);
  color: white;
  margin-bottom: 16px;
  font-size: 16px;
  &:focus { outline: none; border-color: #a855f7; }
`;
const FeeInfo = styled.div`
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 20px;
`;
const ModalActions = styled.div`
  display: flex;
  gap: 12px;
`;
const ModalButton = styled.button<{ $confirm?: boolean }>`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: ${(p) => (p.$confirm ? '#22c55e' : '#334155')};
  color: white;
  &:disabled { opacity: 0.5; }
`;

/* ---------- Componente ---------- */
export default function VaultsClient() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [address, setAddress] = useState<string | undefined>();
  const [feePercentage, setFeePercentage] = useState<number>(100);
  const [showFeeSettings, setShowFeeSettings] = useState(false);
  const [selectedVault, setSelectedVault] = useState<any | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Saldi per ogni vault (indice per id)
  const [balances, setBalances] = useState<Record<string, string>>({});
  const [loadingBalances, setLoadingBalances] = useState(false);

  useEffect(() => {
    setAddress(wallet?.accounts[0]?.address);
  }, [wallet]);

  useEffect(() => {
    const saved = localStorage.getItem('devFeePercentage');
    if (saved) setFeePercentage(Number(saved));
  }, []);

  // Carica i saldi quando cambia l'address o la lista dei vault
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
            // Token ERC-20
            const erc20 = new ethers.Contract(v.token, ['function balanceOf(address) view returns (uint256)'], provider);
            const bal = await erc20.balanceOf(address);
            newBalances[v.id] = ethers.utils.formatUnits(bal, v.tokenDecimals);
          }
        } catch (err) {
          console.error(`Errore saldo per ${v.name}`, err);
          newBalances[v.id] = '0';
        }
      }
      setBalances(newBalances);
      setLoadingBalances(false);
    };
    fetchBalances();
  }, [address, wallet]);

  const handleDeposit = useCallback(async () => {
    if (!selectedVault || !depositAmount || !address || !wallet) return;
    setLoading(true);
    try {
      const res = await fetch('/api/portals/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vaultId: selectedVault.id,
          amount: depositAmount,
          tokenIn: selectedVault.token,
          feeRecipient: FEE_RECIPIENT,
          feePercentage,
        }),
      });
      const data = await res.json();
      if (data.tx) {
        const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
        const signer = provider.getSigner();
        const tx = await signer.sendTransaction({
          to: data.tx.to,
          data: data.tx.data,
          value: data.tx.value ? ethers.BigNumber.from(data.tx.value) : undefined,
        });
        await tx.wait();
        alert('Deposito inviato!');
        setSelectedVault(null);
        setDepositAmount('');
      } else {
        alert('Errore nella costruzione della transazione');
      }
    } catch (err) {
      console.error(err);
      alert('Errore');
    } finally {
      setLoading(false);
    }
  }, [selectedVault, depositAmount, address, wallet, feePercentage]);

  return (
    <PageWrapper>
      <Container>
        <HeaderRow>
          <Title>Vaults (Portals.fi)</Title>
          <RightSide>
            <PillButton onClick={() => setShowFeeSettings(!showFeeSettings)}>
              ⚙️ Dev Fee
            </PillButton>
            {!address ? (
              <PillButton $primary onClick={() => connect()}>
                {connecting ? 'Connecting...' : 'Connect Wallet'}
              </PillButton>
            ) : (
              <AddressBadge>
                {address.slice(0, 6)}...{address.slice(-4)}
                <DisconnectBtn onClick={() => wallet && disconnect(wallet)}>
                  Disconnect
                </DisconnectBtn>
              </AddressBadge>
            )}
          </RightSide>
        </HeaderRow>

        {showFeeSettings && (
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid #a855f7', borderRadius: 16, padding: 20, marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 16 }}>Dev Fee</h3>
              <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#94a3b8' }}>
                {FEE_RECIPIENT.slice(0, 6)}...{FEE_RECIPIENT.slice(-4)}
              </span>
            </div>
            <div style={{ marginTop: 16 }}>
              <label style={{ fontSize: 13, color: '#94a3b8' }}>Percentuale (bps)</label>
              <Input
                type="number"
                value={feePercentage}
                onChange={(e) => {
                  setFeePercentage(Number(e.target.value));
                  localStorage.setItem('devFeePercentage', e.target.value);
                }}
                style={{ marginTop: 8 }}
              />
            </div>
          </div>
        )}

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
                  <Value>{vault.apy.toFixed(2)}%</Value>
                </Stat>
                <Stat>
                  <Label>TVL</Label>
                  <Value>${vault.tvl.toLocaleString()}</Value>
                </Stat>
              </StatsRow>
              {address && (
                <BalanceRow>
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>Saldo</span>
                  <span style={{ fontWeight: 600 }}>
                    {loadingBalances ? '...' : `${parseFloat(balances[vault.id] || '0').toFixed(4)}`}
                  </span>
                </BalanceRow>
              )}
              <DepositBtn
                onClick={() => setSelectedVault(vault)}
                disabled={!address}
              >
                {address ? 'Deposita' : 'Connetti il wallet'}
              </DepositBtn>
            </Card>
          ))}
        </CardGrid>

        {selectedVault && (
          <ModalOverlay onClick={() => setSelectedVault(null)}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalTitle>Deposita in {selectedVault.name}</ModalTitle>
              <Input
                type="text"
                placeholder="Importo"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
              <FeeInfo>Dev fee: {feePercentage / 100}% a {FEE_RECIPIENT.slice(0, 6)}...</FeeInfo>
              <ModalActions>
                <ModalButton onClick={() => setSelectedVault(null)}>Annulla</ModalButton>
                <ModalButton $confirm onClick={handleDeposit} disabled={loading || !depositAmount}>
                  {loading ? 'Invio...' : 'Conferma'}
                </ModalButton>
              </ModalActions>
            </Modal>
          </ModalOverlay>
        )}
      </Container>
    </PageWrapper>
  );
}
