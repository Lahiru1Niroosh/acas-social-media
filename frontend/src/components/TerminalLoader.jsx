export default function TerminalLoader() {
  const steps = [
    "Initializing Neural Engine...",
    "Extracting Metadata...",
    "Scanning Image Artifacts...",
    "Cross-referencing Database...",
    "Calculating Probability..."
  ];

  return (
    <div className="bg-slate-950 rounded-2xl p-6 font-mono border border-slate-800 shadow-2xl overflow-hidden relative">
      <div className="flex gap-1.5 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
      </div>
      
      <div className="space-y-2">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-3 text-sm animate-in fade-in slide-in-from-left duration-1000 fill-mode-both" style={{ animationDelay: `${idx * 400}ms` }}>
            <span className="text-emerald-500 font-bold">✓</span>
            <span className="text-slate-300">{step}</span>
          </div>
        ))}
        <div className="pt-2 flex items-center gap-2">
          <span className="text-blue-400 animate-pulse">▋</span>
          <span className="text-blue-400 text-xs uppercase tracking-widest font-bold">Processing Final Verdict...</span>
        </div>
      </div>
      
      {/* Background Glow Effect */}
      <div className="absolute -inset-10 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
    </div>
  );
}