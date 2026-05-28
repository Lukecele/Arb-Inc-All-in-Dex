'use client';

import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { vaultsList } from '../../config/vaults';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const FEE_RECIPIENT = '0xafF5340ECFaf7ce049261f193f5FED6BDF04E7';
const DEV_FEE_PERCENTAGE = 100; // 1% fissa

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
const InputGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
`;
const Input = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  background: rgba(0,0,0,0.3);
  color: white;
  font-size: 16px;
  &:focus { outline: none; border-color: #a855f7; }
`;
const MaxButton = styled.button`
  background: rgba(168, 85, 247, 0.2);
  color: #a855f7;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  &:hover { background: rgba(168, 85, 247, 0.3); }
`;
const FeeInfo = styled.div`
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
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

export default function VaultsClient() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [address, setAddress] = useState<string | undefined>();
  const [selectedVault, setSelectedVault] = useState<any | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState<Record<string, string>>({});
  const [loadingBalances, setLoadingBalances] = useState(false);

  useEffect(() => {
    setAddress(wallet?.accounts[0]?.address);
  }, [wallet]);

  useEffect(() => {
    if (!address || !wallet) return;
    const fetchBalances = async () => {
      setLoadingBalances(true);
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
      const newBalances: Record<string, string> = {};
      for (const v of vaultsList) {
        try {
          if (v.token === '0x0000000000000000000000000000000000000000') {
            const bal = await provider.getBalance(address);
            newBalances[v.id] = ethers.utils.formatEther(bal);
          } else {
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
          feePercentage: DEV_FEE_PERCENTAGE,
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
        // Ricarica i saldi dopo il deposito
        if (address && wallet) {
          const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
          if (selectedVault.token === '0x0000000000000000000000000000000000000000') {
            const bal = await provider.getBalance(address);
            setBalances(prev => ({ ...prev, [selectedVault.id]: ethers.utils.formatEther(bal) }));
          } else {
            const erc20 = new ethers.Contract(selectedVault.token, ['function balanceOf(address) view returns (uint256)'], provider);
            const bal = await erc20.balanceOf(address);
            setBalances(prev => ({ ...prev, [selectedVault.id]: ethers.utils.formatUnits(bal, selectedVault.tokenDecimals) }));
          }
        }
      } else {
        alert('Errore nella costruzione della transazione');
      }
    } catch (err) {
      console.error(err);
      alert('Errore');
    } finally {
      setLoading(false);
    }
  }, [selectedVault, depositAmount, address, wallet]);

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

  return (
    <>
      <Header activePage="/vaults" walletSection={walletSection} />
      <PageWrapper>
        <Container>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0, background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Vaults (Portals.fi)
            </h1>
            <p style={{ color: '#94a3b8', marginTop: '8px' }}>
              Guadagna yield sui tuoi asset. È applicata una commissione di deposito fissa dell'1% che sostiene il protocollo.
            </p>
          </div>

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
                    <span style={{ fontSize: 13, color: '#94a3b8' }}>Il tuo saldo</span>
                    <span style={{ fontWeight: 600 }}>
                      {loadingBalances ? '...' : `${parseFloat(balances[vault.id] || '0').toFixed(4)}`}
                    </span>
                  </BalanceRow>
                )}
                <DepositBtn
                  onClick={() => {
                    setDepositAmount(''); // reset amount
                    setSelectedVault(vault);
                  }}
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
                <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '14px' }}>
                  <span>Saldo disponibile: {parseFloat(balances[selectedVault.id] || '0').toFixed(4)}</span>
                </div>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    step="any"
                    min="0"
                  />
                  <MaxButton onClick={() => setDepositAmount(balances[selectedVault.id] || '0')}>
                    MAX
                  </MaxButton>
                </InputGroup>
                <FeeInfo>
                  <span>Commissione di deposito: {(DEV_FEE_PERCENTAGE / 100).toFixed(2)}% (una tantum)</span>
                  <span>Destinatario: {FEE_RECIPIENT.slice(0, 6)}...{FEE_RECIPIENT.slice(-4)}</span>
                </FeeInfo>
                <ModalActions>
                  <ModalButton onClick={() => setSelectedVault(null)}>Annulla</ModalButton>
                  <ModalButton $confirm onClick={handleDeposit} disabled={loading || !depositAmount || parseFloat(depositAmount) <= 0}>
                    {loading ? 'Invio...' : 'Conferma Deposito'}
                  </ModalButton>
                </ModalActions>
              </Modal>
            </ModalOverlay>
          )}
        </Container>
        <Footer />
      </PageWrapper>
    </>
  );
}
