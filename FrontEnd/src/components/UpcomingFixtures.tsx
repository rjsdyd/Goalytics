export default function UpcomingFixtures() {
  return (
    <div className="lg:col-span-7 bg-white rounded-[32px] p-8 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Upcoming Fixtures</h2>
      <div className="flex gap-4 overflow-hidden">
        <div className="bg-gray-50 rounded-2xl p-5 min-w-[200px] flex-1">
          <p className="text-xs text-gray-400 font-bold mb-3">SAT 15:00</p>
          <div className="flex justify-between items-center font-bold text-lg">
            <span>ARS</span>
            <span className="text-xs bg-white px-2 py-1 rounded shadow-sm text-gray-400">VS</span>
            <span>MUN</span>
          </div>
        </div>
      </div>
    </div>
  );
}