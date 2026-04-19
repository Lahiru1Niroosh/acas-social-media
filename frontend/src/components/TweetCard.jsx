import TweetActions from "./TweetActions";

export default function TweetCard({ tweet, onVerify, isVerifying }) {
  return (
    <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1)] hover:border-blue-200 transition-all duration-300">
      <div className="flex gap-4">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <img 
            src={tweet.user.avatar} 
            className="w-12 h-12 rounded-full object-cover ring-4 ring-slate-50 border border-slate-200" 
            alt="Profile" 
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* USER INFO BAR with FIXED BLUE TICK */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-bold text-slate-900 text-[15px] hover:underline cursor-pointer truncate">
                {tweet.user.name}
              </span>
              
              {/* FIXED: The Blue Verified Tick */}
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-blue-500 fill-current flex-shrink-0">
                <path d="M22.5 12.5c0-1.58-.8-3-2.14-3.82.43-1.42.22-3.05-.82-4.1s-2.68-1.25-4.1-.82c-.82-1.34-2.24-2.14-3.82-2.14s-3 1.14-3.82 2.14c-1.42-.43-3.05-.22-4.1.82s-1.25 2.68-.82 4.1c-1.34.82-2.14 2.24-2.14 3.82s1.14 3 2.14 3.82c-.43 1.42-.22 3.05.82 4.1s2.68 1.25 4.1.82c.82 1.34 2.24 2.14 3.82 2.14s3-1.14 3.82-2.14c1.42.43 3.05.22 4.1-.82s1.25-2.68.82-4.1c1.34-.82 2.14-2.24 2.14-3.82zM10 16.5l-3.5-3.5 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z" />
              </svg>

              <span className="text-slate-400 text-sm truncate">@{tweet.user.username}</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-50 px-2 py-1 rounded border border-slate-100">LOG_#{tweet.id.toString().slice(0,4)}</span>
          </div>

          <p className="text-slate-700 text-[15px] leading-relaxed mb-4">
            {tweet.text}
          </p>

          {tweet.image && (
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-inner-sm mb-4">
              <img src={tweet.image} className="w-full object-cover max-h-80" alt="evidence" />
            </div>
          )}

          <TweetActions likes={tweet.likes} comments={tweet.comments} />

          {/* NEXT LEVEL PROFESSIONAL BUTTON */}
          <button
            onClick={() => onVerify(tweet)}
            disabled={isVerifying}
            className={`mt-4 w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border
              ${isVerifying 
                ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-slate-900 border-slate-900 text-white hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-100"
              }`}
          >
            {isVerifying ? (
              <>
                <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                Analyzing via ACAS Core...
              </>
            ) : (
              "Analyze Authenticity"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}