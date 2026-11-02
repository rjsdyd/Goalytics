import WorldCupCard from './WorldCupCard';
import ContinentalCupCard from './ContinentalCupCard';
import FifaRankingCard from './FifaRankingCard';

export default function NationalContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* 1. 역대 월드컵 우승팀 카드 */}
      <div className="lg:col-span-5 flex">
        <WorldCupCard />
      </div>

      {/* 2. 대륙별 컵대회 우승국 카드 */}
      <div className="lg:col-span-4 flex">
        <ContinentalCupCard />
      </div>

      {/* 3. 최신 FIFA 랭킹 카드 */}
      <div className="lg:col-span-3 flex">
        <FifaRankingCard />
      </div>

    </div>
  );
}