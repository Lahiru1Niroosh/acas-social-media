import { fakeTweets } from "../data/fakeTweets";
import TweetCard from "./TweetCard";

export default function FeedLayout({ onVerify, verifyingId }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Subtle Professional Grid Background */}
      <div className="fixed inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50"></div>

      {/* Main Container */}
      <div className="relative max-w-6xl mx-auto flex min-h-screen border-x border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm">
        
        {/* Professional Sidebar (Hidden on mobile) */}
        <aside className="hidden lg:flex w-72 flex-col border-r border-slate-200 p-8 sticky top-0 h-screen">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="font-extrabold text-xl tracking-tighter text-slate-800">ACAS</h1>
          </div>
          
          <nav className="space-y-6">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navigation</div>
            <div className="flex items-center gap-3 text-blue-600 font-semibold text-sm bg-blue-50 -mx-4 px-4 py-2 rounded-lg">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Active Stream
            </div>
            <div className="text-sm text-slate-500 px-4 hover:text-slate-800 cursor-pointer transition">Verification Logs</div>
            <div className="text-sm text-slate-500 px-4 hover:text-slate-800 cursor-pointer transition">Risk Reports</div>
          </nav>

          <div className="mt-auto p-4 bg-slate-100 rounded-2xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">System Status</p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              All Nodes Operational
            </div>
          </div>
        </aside>

        {/* The Feed */}
        <main className="flex-1 max-w-2xl mx-auto py-10 px-6">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Intelligence Stream</h2>
              <p className="text-slate-500 text-sm">Real-time content authentication feed</p>
            </div>
          </div>

          <div className="space-y-6">
            {fakeTweets.map((t) => (
              <TweetCard
                key={t.id}
                tweet={t}
                onVerify={onVerify}
                isVerifying={verifyingId === t.id}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}