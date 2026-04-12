'use client';

export default function AdBanner() {
  return (
    <div className="flex flex-col items-center w-full max-w-[340px] my-4 p-4 border border-slate-500/10 bg-slate-500/5 rounded-2xl">
      <span className="text-[9px] text-slate-400/60 uppercase mb-2 tracking-widest font-bold">
        Ad Slot Ready
      </span>
      <div className="min-h-[250px] flex items-center justify-center text-slate-500 text-xs italic">
        Waiting for new provider...
      </div>
    </div>
  );
}
