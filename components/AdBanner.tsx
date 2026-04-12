'use client';

export default function AdBanner() {
  return (
    <div className="flex flex-col items-center my-12 p-6 border border-slate-800 bg-slate-900/40 rounded-3xl backdrop-blur-sm">
      <span className="text-[10px] text-slate-500 uppercase mb-4 tracking-[0.2em] font-semibold">
        Partnership Ads
      </span>
      {/* Step 2: Il placeholder del banner */}
      <div data-banner-id="1487808"></div>
    </div>
  );
}
