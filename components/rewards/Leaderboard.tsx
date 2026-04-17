'use client';
import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((json) => {
        setData(json.leaderboard || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-4 text-yellow-500">Caricamento classifica...</div>;

  return (
    <div className="bg-gray-900 border border-yellow-500/30 rounded-xl p-6 shadow-2xl mt-10">
      <h2 className="text-2xl font-bold text-yellow-500 mb-6">🏆 Top 10 Arbitrage Farmers</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700 text-gray-400 uppercase text-sm">
            <tr>
              <th className="pb-3 px-2">Rank</th>
              <th className="pb-3 px-2">Wallet</th>
              <th className="pb-3 px-2 text-right">Punti</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.map((user, index) => (
              <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                <td className="py-4 px-2 font-mono text-lg text-yellow-500">#{index + 1}</td>
                <td className="py-4 px-2 font-mono text-sm text-gray-300">
                  {user.wallet.slice(0, 6)}...{user.wallet.slice(-4)}
                </td>
                <td className="py-4 px-2 text-right font-bold text-yellow-400">
                  {user.score.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
