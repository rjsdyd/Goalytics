import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LiveMatch from './components/LiveMatch';
import Standings from './components/History';
import MiniStats from './components/MiniStats';
import UpcomingFixtures from './components/UpcomingFixtures';
import MatchPredictions from './components/MatchPredictions';

// 기존 벤토 그리드 메인 화면
function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <LiveMatch />
      <Standings />
      <div className="lg:col-span-3 flex flex-col gap-6">
        <MiniStats />
      </div>
      <UpcomingFixtures />
      <MatchPredictions />
    </div>
  );
}

// 나중에 만들 Leagues 빈 화면
function Leagues() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400 border-2 border-dashed border-gray-200 rounded-[32px]">
      <span className="text-4xl mb-4">🏆</span>
      <h2 className="text-xl font-bold text-gray-600 mb-2">Leagues 페이지 준비 중</h2>
      <p className="text-sm">이곳에 각 리그별 상세 정보가 들어갈 예정입니다.</p>
    </div>
  );
}

function App() {
  return (
    // URL 라우팅을 활성화하는 BrowserRouter
    <BrowserRouter>
      <div className="bg-gray-50 min-h-screen p-8 font-sans text-gray-800">
        <div className="max-w-[1200px] mx-auto">
          {/* Header는 라우터 안에서 모든 페이지에 공통으로 노출됩니다 */}
          <Header />
          
          {/* URL 경로에 따라 보여줄 화면을 결정합니다 */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leagues" element={<Leagues />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;