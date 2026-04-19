export default function FinalVerdict({ result, onMore }) {
  const label = result?.final_prediction?.label || "UNKNOWN";
  const confidence = result?.final_prediction?.confidence || 0;
  const isReal = label === "REAL";

  return (
    <div className="text-center animate-in zoom-in duration-300">
      <div className="relative inline-block mb-6">
        {/* Glow effect */}
        <div className={`absolute inset-0 blur-2xl opacity-20 rounded-full ${isReal ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
        
        <div className={`relative px-8 py-4 rounded-3xl border-2 flex flex-col items-center gap-1 ${
          isReal ? "border-emerald-500 bg-emerald-50" : "border-red-500 bg-red-50"
        }`}>
          <span className={`text-5xl font-black tracking-tighter ${isReal ? "text-emerald-600" : "text-red-600"}`}>
            {isReal ? "AUTHENTIC" : "DECEPTIVE"}
          </span>
          <span className={`text-xs font-bold uppercase tracking-[0.2em] ${isReal ? "text-emerald-500" : "text-red-500"}`}>
            AI Probability: {confidence}%
          </span>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-8">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Primary Evidence</h4>
        <p className="text-gray-700 text-sm leading-relaxed italic">
          "{result?.explanation || 'No anomalies detected in pixel density or linguistic patterns.'}"
        </p>
      </div>

      <button
        onClick={onMore}
        className="group relative w-full sm:w-auto overflow-hidden bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95"
      >
        <span className="relative z-10">View Deep-Dive Analysis</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
    </div>
  );
}