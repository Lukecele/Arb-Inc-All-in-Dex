'use client';

import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';

const FEE_RECIPIENT = '0xafF5340ECFaf7ce049261f193f5FED6BDF04E7';

export default function VaultsClient() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [address, setAddress] = useState<string | undefined>();
  const [vaults, setVaults] = useState<any[]>([]);
  const [feePercentage, setFeePercentage] = useState<number>(100);
  const [showFeeSettings, setShowFeeSettings] = useState(false);
  const [selectedVault, setSelectedVault] = useState<any | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawJson, setRawJson] = useState<string>('');

  useEffect(() => {
    setAddress(wallet?.accounts[0]?.address);
  }, [wallet]);

  useEffect(() => {
    const savedPercentage = localStorage.getItem('devFeePercentage');
    if (savedPercentage) setFeePercentage(Number(savedPercentage));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch('/api/portals/vaults')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const jsonStr = JSON.stringify(data, null, 2);
        console.log('Risposta grezza vaults:', jsonStr);
        setRawJson(jsonStr);
        // Tenta diversi percorsi
        const list = data?.vaults || data?.data?.vaults || data?.data || data || [];
        console.log('Array estratto:', list);
        if (Array.isArray(list)) {
          setVaults(list);
          setError(null);
        } else {
          setError('Formato dati non valido. Guarda il JSON qui sotto.');
        }
      })
      .catch(err => {
        console.error('Failed to fetch vaults', err);
        setError(err.message || 'Errore nel caricamento');
      })
      .finally(() => setLoading(false));
  }, []);

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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vaults (Portals.fi)</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setShowFeeSettings(!showFeeSettings)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            ⚙️ Dev Fee
          </button>
          {!address ? (
            <button
              onClick={() => connect()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
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
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>

      {showFeeSettings && (
        <div className="bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-xl mb-2">Dev Fee</h2>
          <p className="text-sm text-gray-400 mb-3">
            Indirizzo: {FEE_RECIPIENT.slice(0, 6)}...{FEE_RECIPIENT.slice(-4)}
          </p>
          <div>
            <label className="block text-sm mb-1">Percentuale (in basis points, 100 = 1%)</label>
            <input
              type="number"
              value={feePercentage}
              onChange={(e) => {
                const val = Number(e.target.value);
                setFeePercentage(val);
                localStorage.setItem('devFeePercentage', val.toString());
              }}
              className="p-2 bg-gray-700 rounded text-white w-full"
            />
          </div>
          <button
            onClick={() => setShowFeeSettings(false)}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Chiudi
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-gray-400">Caricamento vaults...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-900/30 border border-red-700 rounded p-4 text-center">
          <p className="text-red-400">Errore: {error}</p>
          {rawJson && (
            <details className="mt-2 text-left">
              <summary className="cursor-pointer text-gray-400 text-sm">Mostra JSON ricevuto</summary>
              <pre className="text-xs text-gray-300 mt-2 overflow-auto max-h-40 bg-black p-2 rounded">{rawJson}</pre>
            </details>
          )}
        </div>
      )}

      {!loading && !error && vaults.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nessun vault disponibile.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vaults.map((vault: any) => (
          <div key={vault.id} className="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold">{vault.name}</h2>
            <p className="text-sm text-gray-400">{vault.protocol}</p>
            <div className="flex justify-between mt-3">
              <span>APY: {vault.apy?.toFixed(2) ?? 'N/A'}%</span>
              <span>TVL: ${vault.tvl?.toLocaleString() ?? 'N/A'}</span>
            </div>
            <button
              onClick={() => setSelectedVault(vault)}
              disabled={!address}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2 rounded"
            >
              {address ? 'Deposita' : 'Connetti il wallet'}
            </button>
          </div>
        ))}
      </div>

      {selectedVault && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full">
            <h2 className="text-2xl mb-4">Deposita in {selectedVault.name}</h2>
            <input
              type="text"
              placeholder="Importo"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded mb-4 text-white"
            />
            <div className="text-sm text-gray-400 mb-4">
              Dev fee: {feePercentage / 100}% a {FEE_RECIPIENT.slice(0, 6)}...
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDeposit}
                disabled={loading || !depositAmount}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 rounded"
              >
                {loading ? 'Invio...' : 'Conferma'}
              </button>
              <button
                onClick={() => setSelectedVault(null)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
