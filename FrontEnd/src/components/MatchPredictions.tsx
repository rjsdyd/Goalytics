export default function MatchPredictions() {
  return (
    <div className="lg:col-span-5 bg-[#141b26] rounded-[32px] p-8 shadow-sm text-white flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-3">Match Predictions</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Our AI model predicts a 72% chance of Over 2.5 goals in the next TOT vs CHE match.
        </p>
      </div>
      <button className="bg-[#41e307] text-[#141b26] font-bold py-3 px-6 rounded-xl w-max hover:bg-green-400 transition mt-6">
        View Analysis
      </button>
    </div>
  );
}