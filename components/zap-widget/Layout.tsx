import React from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import { Home, Layers, Activity, Settings, Wallet, Menu } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const handleWalletAction = () => {
    if (wallet) {
      disconnect(wallet);
    } else {
      connect();
    }
  };

  return (
    <div className="flex h-screen bg-[#0D111C] text-[#E2E8F0] font-sans overflow-hidden">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-[#1E293B] bg-[#0A0D14] z-10">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex justify-center items-center font-bold text-white shadow-lg shadow-blue-500/20">A</div>
          <span className="text-lg font-semibold tracking-tight text-white">ArbInc DEX</span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavItem icon={<Home size={18} />} label="Dashboard" />
          <NavItem icon={<Activity size={18} />} label="Aggregator" />
          <NavItem icon={<Layers size={18} />} label="Zap / Earn" active />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Header */}
        <header className="h-[72px] border-b border-[#1E293B] flex items-center justify-between px-4 lg:px-6 bg-[#0D111C]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 lg:hidden">
            <button className="text-slate-400 hover:text-white transition-colors">
              <Menu size={24} />
            </button>
            <span className="text-lg font-semibold tracking-tight text-white">ArbInc</span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-sm text-slate-400 font-medium">
            BNB Smart Chain
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleWalletAction}
              disabled={connecting}
              className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#273549] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-transparent hover:border-slate-600"
            >
              <Wallet size={16} className="text-blue-400" />
              {connecting 
                ? 'Connecting...' 
                : wallet 
                  ? `${wallet.accounts[0].address.slice(0, 6)}...${wallet.accounts[0].address.slice(-4)}`
                  : 'Connect Wallet'
              }
            </button>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto w-full flex flex-col items-center py-10 px-4">
          <div className="w-full max-w-[1200px]">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a 
      href="#" 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        active 
          ? 'bg-[#1E293B] text-white' 
          : 'text-slate-400 hover:bg-[#1E293B]/50 hover:text-slate-200'
      }`}
    >
      {icon}
      {label}
    </a>
  );
}
