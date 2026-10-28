export default function MiniStats() {
  return (
    <>
      <div className="bg-[#41e307] rounded-[32px] p-6 shadow-sm flex-1 flex flex-col justify-between relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <span className="font-semibold text-gray-900">Top Scorer</span>
          <span className="text-xl">✨</span>
        </div>
        <div>
          <h3 className="text-3xl font-black text-gray-900 mb-1">E. Haaland</h3>
          <p className="text-gray-800 font-medium">20 Goals <span className="opacity-75 font-normal">/ 25 Apps</span></p>
        </div>
      </div>
      <div className="bg-white rounded-[32px] p-6 shadow-sm flex-1">
        <h3 className="font-semibold text-gray-800 mb-2">Win Rate</h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-black">68%</span>
          <span className="text-[#41e307] font-bold text-sm">+5% ↑</span>
        </div>
        <div className="flex items-end gap-1.5 h-10 mt-auto">
          <div className="w-full bg-gray-100 rounded-t-sm h-[30%]"></div>
          <div className="w-full bg-gray-100 rounded-t-sm h-[40%]"></div>
          <div className="w-full bg-[#41e307] rounded-t-sm h-[100%]"></div>
        </div>
      </div>
    </>
  );
}