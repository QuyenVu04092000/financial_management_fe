export default function RootLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top bar skeleton */}
      <div className="h-[88px] bg-[#0046B0]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_60%)]" />
      </div>

      <div className="relative z-10 -mt-8 flex-1 space-y-4 px-4 pb-10 pt-2 animate-pulse">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-slate-200" />
            <div className="space-y-2">
              <div className="h-3 w-28 rounded-full bg-slate-200" />
              <div className="h-3 w-40 rounded-full bg-slate-200" />
            </div>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-200" />
        </div>

        {/* Two summary cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
        </div>

        {/* Main card skeleton */}
        <div className="space-y-3 rounded-3xl bg-slate-50 p-4">
          <div className="h-4 w-32 rounded-full bg-slate-200" />
          <div className="h-10 rounded-2xl bg-slate-200" />
          <div className="h-10 rounded-2xl bg-slate-200" />
          <div className="h-10 rounded-2xl bg-slate-200" />
        </div>

        {/* List skeleton */}
        <div className="space-y-2 rounded-2xl bg-slate-50 p-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="h-9 w-9 rounded-full bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 rounded-full bg-slate-200" />
                <div className="h-3 w-24 rounded-full bg-slate-200" />
              </div>
              <div className="space-y-2 text-right">
                <div className="h-3 w-16 rounded-full bg-slate-200" />
                <div className="h-3 w-20 rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

