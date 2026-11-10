import WorldCupCard from './WorldCupCard';
import ContinentalCupCard from './ContinentalCupCard';
import FifaRankingCard from './FifaRankingCard';

export default function NationalContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <div className="lg:col-span-5 flex">
        <WorldCupCard />
      </div>

      <div className="lg:col-span-4 flex">
        <ContinentalCupCard />
      </div>

      <div className="lg:col-span-3 flex">
        <FifaRankingCard />
      </div>

    </div>
  );
}