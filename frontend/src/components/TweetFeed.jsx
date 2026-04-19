import { fakeTweets } from "../data/fakeTweets";
import TweetCard from "./TweetCard";

export default function TweetFeed({ onVerify, verifyingId }) {
  // if you prefer to pass tweets as a prop later, you can replace this with a
  // parameter; for now we just render the hard‑coded dataset.
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-2">AI Truth Engine</h1>
        <p className="text-gray-500">Analyzing social media patterns using multi-modal neural networks.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fakeTweets.map(tweet => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            onVerify={onVerify}
            isVerifying={verifyingId === tweet.id} // Control loading state per card
          />
        ))}
      </div>
    </div>
  );
}