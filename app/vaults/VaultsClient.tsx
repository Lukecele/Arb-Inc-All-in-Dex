'use client';

import { useState, useEffect } from 'react';
import { useAccount, useSendTransaction } from 'wagmi';

interface Vault {
  id: string;
  name: string;
  protocol: string;
  apy: number;
  tvl: number;
  token: string;
}

export default function VaultsClient() {
  const { address, isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const FEE_RECIPIENT = '0xafF5340ECFaf7ce049261f193f5FED6BDF04E7';

  const [vaults, setVaults] = useState<Vault[]>([]);
  const [feePercentage, setFeePercentage] = useState<number>(100);
  const [showFeeSettings, setShowFeeSettings] = useState(false);
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carica percentuale salvata
  useEffect(() => {
    const savedPercentage = localStorage.getItem('devFeePercentage');
    if (savedPercentage) setFeePercentage(Number(savedPercentage));
  }, []);

  // Carica i vault
  useEffect(() => {
    setLoading(true);
    fetch('/api/portals/vaults')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Vaults API response:', data);
        const list = data?.vaults || data || [];
        if (Array.isArray(list)) {
          setVaults(list);
          setError(null);
        } else {
          setError('Formato dati non valido');
        }
      })
      .catch(err => {
        console.error('Failed to fetch vaults', err);
        setError(err.message || 'Errore nel caricamento');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeposit = async () => {
    if (!selectedVault || !depositAmount || !address) return;
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
        const tx = data.tx;
        await sendTransaction({
          to: tx.to as `0x${string}`,
          data: tx.data as `0x${string}`,
          value: tx.value ? BigInt(tx.value) : undefined,
        });
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
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vaults (Portals.fi)</h1>
        <button
          onClick={() => setShowFeeSettings(!showFeeSettings)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          ⚙️ Dev Fee
        </button>
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
          <p className="text-sm text-gray-400 mt-2">Verifica che la variabile PORTALS_API_KEY sia impostata su Vercel.</p>
        </div>
      )}

      {!loading && !error && vaults.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nessun vault disponibile.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vaults.map((vault) => (
          <div key={vault.id} className="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold">{vault.name}</h2>
            <p className="text-sm text-gray-400">{vault.protocol}</p>
            <div className="flex justify-between mt-3">
              <span>APY: {vault.apy.toFixed(2)}%</span>
              <span>TVL: ${vault.tvl.toLocaleString()}</span>
            </div>
            <button
              onClick={() => setSelectedVault(vault)}
              disabled={!isConnected}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2 rounded"
            >
              {isConnected ? 'Deposita' : 'Connetti il wallet'}
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
