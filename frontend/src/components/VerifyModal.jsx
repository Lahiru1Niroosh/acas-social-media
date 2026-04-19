export default function VerifyModal({ result, onClose }) {
  const isReal = result.final_prediction.label.toLowerCase().includes('real');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className={`p-6 text-white ${isReal ? 'bg-emerald-600' : 'bg-red-600'} flex justify-between items-center`}>
          <div>
            <h2 className="text-2xl font-black tracking-tight uppercase">Analysis Report</h2>
            <p className="opacity-80 text-xs">SCAN ID: {result.user.masked_id}</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Final Verdict - The Hero Stat */}
          <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Final Verdict</p>
            <h3 className={`text-5xl font-black mb-2 ${isReal ? 'text-emerald-600' : 'text-red-600'}`}>
              {result.final_prediction.label}
            </h3>
            <div className="flex items-center justify-center gap-2">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${isReal ? 'bg-emerald-500' : 'bg-red-500'}`} 
                  style={{ width: `${result.final_prediction.confidence}%` }}
                />
              </div>
              <span className="font-mono font-bold text-gray-700">{result.final_prediction.confidence}% Accuracy</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Text Analysis Card */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-bold text-gray-900 border-b pb-2">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">📝</span> Text Analysis
              </h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between uppercase text-[10px] font-black text-gray-400">
                  <span>Sentiment Label</span>
                  <span>{result.text_analysis.label}</span>
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{result.text_analysis.reason}"</p>
              </div>
            </div>

            {/* Image Analysis Card */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-bold text-gray-900 border-b pb-2">
                <span className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">🖼️</span> Image Integrity
              </h4>
              <ul className="space-y-2">
                {result.image_analysis.reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-emerald-500">✔</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Similarity & Reasoning */}
          <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-inner">
            <h4 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
              <span className="animate-pulse">●</span> Cross-Platform Consistency
            </h4>
            <div className="space-y-4">
              {result.explanation.map((e, i) => (
                <p key={i} className="text-sm text-gray-300 leading-relaxed border-l-2 border-gray-700 pl-4">{e}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition-all active:scale-95"
          >
            Dismiss Report
          </button>
        </div>
      </div>
    </div>
  );
}