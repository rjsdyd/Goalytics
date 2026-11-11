import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TIERS = ['S', 'A', 'B', 'C', 'D'];

interface TeamData {
  id: string;
  name: string;
  logo: string;
}

export default function TierMaker() {
  const navigate = useNavigate();
  
  const [availableTeams, setAvailableTeams] = useState<TeamData[]>([]);
  
  const [tierData, setTierData] = useState<Record<string, string[]>>({
    S: [], A: [], B: [], C: [], D: [], unassigned: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTierData();
  }, []);

  const fetchTierData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const masterApiUrl = 'http://localhost:3000/teams';
      const masterRes = await axios.get(masterApiUrl);
      
      if (masterRes.data && masterRes.data.length > 0) {
        console.log(`[club] 첫 번째 데이터 구조 확인:`, masterRes.data[0]);
      }
      
      const masterData: TeamData[] = masterRes.data.map((item: any) => ({
        id: String(item.team_id || item.id),
        name: item.team_name || item.name,
        logo: item.logo_url || item.logo || item.team_logo || item.imageUrl || ''
      }));

      setAvailableTeams(masterData);

      const tierRes = await axios.get(`http://localhost:3000/tiers/my-tier?category=club`, {
        headers 
      });
      
      const savedTiers = tierRes.data.tierData;
      
      const allTeamIds = masterData.map(t => t.id);
      const assignedIds = Object.values(savedTiers).flat() as string[];
      const unassigned = allTeamIds.filter(id => !assignedIds.includes(id));

      setTierData({ ...savedTiers, unassigned });
    } catch (error) {
      console.error('데이터 연동 실패:', error);
      setTierData({ S: [], A: [], B: [], C: [], D: [], unassigned: [] });
      setAvailableTeams([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, teamId: string, sourceTier: string) => {
    e.dataTransfer.setData('teamId', teamId);
    e.dataTransfer.setData('sourceTier', sourceTier);
  };

  // 💡 추가된 로직: 드래그 중 화면 위/아래 가장자리에 닿으면 자동 스크롤
  const handleDrag = (e: React.DragEvent) => {
    if (e.clientY === 0) return; // 드래그 종료 시점의 오류 값 무시

    const edgeThreshold = 100; // 화면 가장자리 인식 범위 (픽셀)
    const scrollSpeed = 25;    // 스크롤 이동 속도

    if (e.clientY < edgeThreshold) {
      // 마우스가 화면 위쪽에 닿았을 때 (올려치기)
      window.scrollBy(0, -scrollSpeed);
    } else if (window.innerHeight - e.clientY < edgeThreshold) {
      // 마우스가 화면 아래쪽에 닿았을 때 (내려치기)
      window.scrollBy(0, scrollSpeed);
    }
  };

  const handleDrop = (e: React.DragEvent, targetTier: string) => {
    e.preventDefault();
    const teamId = e.dataTransfer.getData('teamId');
    const sourceTier = e.dataTransfer.getData('sourceTier');

    if (sourceTier === targetTier || !teamId) return;

    setTierData(prev => {
      const newSource = prev[sourceTier].filter(id => id !== teamId);
      const newTarget = [...prev[targetTier], teamId];
      return { ...prev, [sourceTier]: newSource, [targetTier]: newTarget };
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const { unassigned, ...dataToSave } = tierData; 
      
      await axios.post('http://localhost:3000/tiers/save', {
        category: 'club',
        tierData: dataToSave
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('티어 리스트가 성공적으로 저장되었습니다!');
    } catch (error) {
      alert('저장에 실패했습니다.');
    }
  };

  const getTeamInfo = (id: string) => availableTeams.find(t => t.id === id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 animate-fadeIn">
      {/* 헤더 영역 */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-[#141b26] flex items-center gap-3">
          👑 나만의 티어 메이커
        </h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors"
          >
            돌아가기
          </button>
          <button 
            onClick={handleSave} 
            className="px-8 py-3 rounded-xl font-black text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-[#41e307] text-[#141b26] hover:bg-[#38c406]"
          >
            저장하기
          </button>
        </div>
      </div>

      {/* 티어 보드 (S ~ D) */}
      <div className="flex flex-col gap-3 mb-12">
        {TIERS.map(tier => (
          <div key={tier} className="flex min-h-[110px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className={`w-24 flex items-center justify-center text-3xl font-black
              ${tier === 'S' ? 'bg-[#ff4d4f] text-white' : 
                tier === 'A' ? 'bg-[#ff7a45] text-white' : 
                tier === 'B' ? 'bg-[#ffc53d] text-gray-900' : 
                tier === 'C' ? 'bg-[#73d13d] text-gray-900' : 
                'bg-[#4096ff] text-white'}`}
            >
              {tier}
            </div>
            
            <div 
              className="flex-1 flex flex-wrap gap-3 p-5 bg-gray-50/50"
              onDrop={(e) => handleDrop(e, tier)}
              onDragOver={handleDragOver}
            >
              {tierData[tier]?.map(teamId => {
                const team = getTeamInfo(teamId);
                if (!team) return null;
                
                return (
                  <div
                    key={teamId}
                    draggable
                    onDragStart={(e) => handleDragStart(e, teamId, tier)}
                    onDrag={handleDrag} // 💡 스크롤 로직 부착
                    className="w-20 h-20 flex flex-col items-center justify-center bg-white rounded-xl cursor-grab active:cursor-grabbing hover:shadow-md border border-gray-100 transition-shadow p-2"
                  >
                    {team.logo ? (
                      <img src={team.logo} alt={team.name} className="w-10 h-10 object-contain mb-1" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-full mb-1"></div>
                    )}
                    <span className="text-[10px] text-gray-700 text-center truncate w-full font-bold">{team.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 미지정 팀 풀 */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-black text-xl mb-4 text-[#141b26] flex items-center gap-2">
          <span className="text-gray-400">📥</span> 대기 팀 <span className="text-sm font-medium text-gray-400 ml-2">(위로 드래그하여 배치하세요)</span>
        </h3>
        <div 
          className="min-h-[140px] p-6 bg-gray-50 rounded-2xl flex flex-wrap gap-4 border-2 border-dashed border-gray-200"
          onDrop={(e) => handleDrop(e, 'unassigned')}
          onDragOver={handleDragOver}
        >
          {tierData['unassigned']?.map(teamId => {
            const team = getTeamInfo(teamId);
            if (!team) return null;

            return (
              <div
                key={teamId}
                draggable
                onDragStart={(e) => handleDragStart(e, teamId, 'unassigned')}
                onDrag={handleDrag} // 💡 스크롤 로직 부착
                className="w-24 h-24 flex flex-col items-center justify-center bg-white shadow-sm rounded-2xl cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 p-2"
              >
                {team.logo ? (
                  <img src={team.logo} alt={team.name} className="w-12 h-12 object-contain mb-2" />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-full mb-2"></div>
                )}
                <span className="text-[11px] text-gray-700 text-center font-bold leading-tight">{team.name}</span>
              </div>
            );
          })}
          
          {tierData['unassigned']?.length === 0 && availableTeams.length > 0 && (
            <div className="w-full flex items-center justify-center text-gray-400 font-bold text-sm">
              모든 팀의 배치가 완료되었습니다!
            </div>
          )}
          {availableTeams.length === 0 && (
            <div className="w-full flex items-center justify-center text-red-400 font-bold text-sm">
              팀 데이터를 불러오지 못했습니다. API 주소를 확인해주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}