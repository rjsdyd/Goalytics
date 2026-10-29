import { useContext } from 'react';
import { ModeContext } from '../App';

// API-Sports의 공식 로고 URL을 직접 사용하여 API 호출 횟수를 아낍니다.
const UCL_LOGO = "https://media.api-sports.io/football/leagues/2.png";
const UEL_LOGO = "https://media.api-sports.io/football/leagues/3.png";

export default function ModeSelector() {
  const { activeMode, setActiveMode } = useContext(ModeContext);

  // 흰색 배경에 맞게 텍스트, 테두리, 호버 색상 최적화
  const modes = [
    {
      id: 'league',
      title: '리그',
      desc: '5대 리그',
      icon: <span className="text-3xl">🏆</span>, 
      activeColor: 'bg-[#41e307] text-[#141b26] border-[#41e307]',
      hoverColor: 'hover:border-[#41e307] hover:bg-green-50',
    },
    {
      id: 'ucl',
      title: '챔스',
      desc: 'UCL',
      icon: <img src={UCL_LOGO} alt="UCL Logo" className="w-10 h-10 object-contain drop-shadow-sm" />,
      activeColor: 'bg-blue-500 text-white border-blue-500',
      hoverColor: 'hover:border-blue-500 hover:bg-blue-50',
    },
    {
      id: 'uel',
      title: '유로파',
      desc: 'UEL',
      icon: <img src={UEL_LOGO} alt="UEL Logo" className="w-10 h-10 object-contain drop-shadow-sm" />,
      activeColor: 'bg-orange-500 text-white border-orange-500',
      hoverColor: 'hover:border-orange-500 hover:bg-orange-50',
    },
    {
      id: 'national',
      title: '국대',
      desc: 'A매치',
      icon: <span className="text-3xl">🌍</span>,
      activeColor: 'bg-purple-500 text-white border-purple-500',
      hoverColor: 'hover:border-purple-500 hover:bg-purple-50',
    }
  ];

  return (
    // 💡 w-full 추가로 가로를 끝까지 채우고, bg-white로 배경색 변경
    <div className="w-full bg-white rounded-[32px] p-6 shadow-sm flex flex-col h-full justify-between">
      
      <div className="mb-4">
        {/* 텍스트 색상을 다크모드에서 라이트모드용으로 변경 */}
        <h2 className="text-xl font-bold text-gray-900">Select Dashboard Mode</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {modes.map((mode) => {
          const isActive = activeMode === mode.id;
          
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 ${
                isActive 
                  ? `${mode.activeColor} shadow-md scale-[1.02]` 
                  : `bg-white border-gray-100 text-gray-400 ${mode.hoverColor}`
              }`}
            >
              {/* 비활성화 상태일 때 로고를 흑백(grayscale) 및 반투명 처리하여 세련되게 표현 */}
              <div className={`mb-2 transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-40 grayscale'}`}>
                {mode.icon}
              </div>
              
              <div className="text-center">
                <h3 className={`font-bold text-sm leading-tight ${isActive ? '' : 'text-gray-600'}`}>
                  {mode.title}
                </h3>
                <p className={`text-[10px] mt-0.5 font-medium ${isActive ? 'opacity-90' : 'text-gray-400'}`}>
                  {mode.desc}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );
}