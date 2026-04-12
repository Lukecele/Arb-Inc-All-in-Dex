'use client';

export default function AdBanner() {
  return (
    <div className="flex flex-col items-center w-full max-w-[340px] my-4 p-4 border border-blue-500/20 bg-blue-500/5 rounded-2xl backdrop-blur-md shadow-lg shadow-blue-500/5">
      <span className="text-[9px] text-blue-400/60 uppercase mb-2 tracking-widest font-bold">
        Sponsored Protocol
      </span>
      {/* ClickADilla Banner ID */}
      <div 
        data-banner-id="1487808" 
        style={{ minHeight: '250px', minWidth: '300px', display: 'flex', justifyContent: 'center' }}
      ></div>
    </div>
  );
}
