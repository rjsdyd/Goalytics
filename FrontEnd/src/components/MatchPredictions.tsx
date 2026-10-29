export default function MatchPredictions() {
  return (
    <div className="bg-[#141b26] rounded-[32px] p-6 shadow-sm text-white flex flex-col justify-between h-full min-h-[220px]">
      <div>
        <h2 className="text-xl font-bold mb-2">Match Predictions</h2>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
          Our AI model predicts a 72% chance of Over 2.5 goals in the next TOT vs CHE match.
        </p>
      </div>
      <button className="bg-[#41e307] text-[#141b26] font-bold py-2.5 px-5 rounded-xl w-full hover:bg-green-400 transition text-sm">
        View Analysis
      </button>
    </div>
  );
}