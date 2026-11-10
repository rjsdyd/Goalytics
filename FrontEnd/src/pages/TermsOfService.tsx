import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 fade-in">
      <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="bg-[#141b26] p-10 text-center shrink-0 relative">
          <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-bold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            돌아가기
          </Link>
          <h2 className="text-4xl font-black text-white tracking-tight mt-6">
            📜 이용약관
          </h2>
          <p className="text-gray-400 mt-4 font-medium text-lg">Goalytics 서비스 이용과 관련된 권리, 의무 및 책임사항을 안내합니다.</p>
        </div>

        <div className="p-10 space-y-8 text-gray-700">
          
          <div className="text-base text-[#141b26] mb-8 font-bold leading-relaxed bg-[#41e307]/10 border border-[#41e307]/30 p-6 rounded-2xl">
            환영합니다! 본 약관은 Goalytics(이하 '서비스')의 이용 조건 및 서비스의 특수성(비영리 포트폴리오)을 명확히 안내하기 위해 작성되었습니다. 서비스를 이용함으로써 본 약관에 동의하는 것으로 간주됩니다.
          </div>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              1. 서비스의 목적 및 성격 (포트폴리오 명시)
            </h3>
            <p className="font-medium text-gray-600 pl-5 leading-relaxed">
              본 서비스는 개발자의 기술적 역량을 보여주기 위한 <strong>개인 포트폴리오 목적으로 제작된 비영리 웹 애플리케이션</strong>입니다. 광고 수익이나 유료 결제 등 어떠한 상업적 수익 창출도 목적으로 하지 않으며, 누구나 무료로 기능을 체험해 볼 수 있습니다.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              2. 외부 API 활용 및 데이터 출처
            </h3>
            <p className="font-medium text-gray-600 pl-5 mb-2">본 서비스는 실시간 축구 데이터 및 AI 분석을 제공하기 위해 다음과 같은 외부 API를 연동하여 사용하고 있습니다.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium pl-5">
              <li><strong className="text-[#141b26]">Google Gemini API:</strong> 팀 전술 분석 리포트 및 가상 매치업 시뮬레이터 결과 생성</li>
              <li><strong className="text-[#141b26]">API-Sports (API-Football):</strong> 주요 리그/국가대표 팀 정보, 경기 일정(Fixtures), 실시간 스코어</li>
              <li><strong className="text-[#141b26]">football-data.org:</strong> 리그별 순위(Standings) 및 과거 데이터 동기화</li>
              <li><strong className="text-[#141b26]">NewsAPI.org:</strong> 글로벌 축구계 실시간 최신 뉴스 및 이적설 피드</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              3. 서비스 이용의 한계 및 면책 조항
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium pl-5">
              <li><strong className="text-[#141b26]">데이터의 정확성:</strong> 외부 API에서 제공받는 실시간 스코어, 순위, 뉴스 등의 데이터는 원본 제공처의 사정에 따라 지연되거나 오류가 있을 수 있으며, 회사는 그 정확성을 완벽히 보증하지 않습니다.</li>
              <li><strong className="text-[#141b26]">AI 분석의 한계:</strong> 가상 매치업 시뮬레이터 및 전술 브리핑은 AI(Gemini) 모델의 예측값(가상 데이터)에 불과하며, 실제 경기 결과와 무관합니다. 해당 결과를 활용하여 발생한 금전적 손실(스포츠 베팅 등)에 대해 회사는 어떠한 법적 책임도 지지 않습니다.</li>
              <li><strong className="text-[#141b26]">서비스 중단:</strong> 본 서비스는 개인 프로젝트로 운영되므로, 서버 유지비용 문제나 외부 API의 할당량(Quota) 초과 시 예고 없이 서비스가 일시 중단되거나 영구 종료될 수 있습니다.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              4. 저작권 및 지적재산권
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium pl-5">
              <li>Goalytics의 UI/UX 디자인, 프론트엔드/백엔드 소스코드(캐싱 최적화 로직 등), 커스텀 마크다운 파서 등에 대한 지적재산권은 원작자인 개발자에게 있습니다.</li>
              <li>서비스 내에 노출되는 각 구단의 엠블럼 로고, 선수 사진, 뉴스 썸네일 이미지 및 외부 API 제공 데이터의 저작권은 해당 원작자 및 권리자에게 귀속됩니다.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              5. 이용자의 의무
            </h3>
            <p className="font-medium text-gray-600 pl-5 leading-relaxed">
              이용자는 본 서비스를 체험함에 있어 비정상적인 방법으로 서버에 과부하를 주거나(매크로, 디도스 공격 등), 외부 API 호출을 고의로 남용하여 개발자의 무료 할당량을 고갈시키는 행위를 하여서는 안 됩니다. 위반 시 사전 안내 없이 서비스 접근이 차단될 수 있습니다.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              6. 부칙
            </h3>
            <p className="text-gray-600 font-medium pl-5">
              본 약관은 <strong>2026년 11월 9일</strong>부터 적용됩니다. 포트폴리오 심사관님 및 모든 방문자분들의 즐거운 이용을 바랍니다!
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}