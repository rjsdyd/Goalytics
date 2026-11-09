import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 fade-in">
      <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        
        {/* 헤더 영역 */}
        <div className="bg-[#141b26] p-10 text-center shrink-0 relative">
          <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-bold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            돌아가기
          </Link>
          <h2 className="text-4xl font-black text-white tracking-tight mt-6">
            🛡️ 개인정보 처리방침
          </h2>
          <p className="text-gray-400 mt-4 font-medium text-lg">Goalytics는 이용자의 소중한 개인정보를 안전하게 보호합니다.</p>
        </div>

        {/* 본문 영역 */}
        <div className="p-10 space-y-8 text-gray-700">
          
          <div className="text-base text-gray-500 mb-8 font-medium leading-relaxed bg-gray-50 p-6 rounded-2xl">
            Goalytics(이하 '회사', '서비스명')은(는) 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련된 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
          </div>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              1. 개인정보의 처리 목적
            </h3>
            <p className="font-medium text-gray-600 pl-5">Goalytics는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium pl-5">
              <li><strong className="text-[#141b26]">회원 가입 및 관리:</strong> 회원 가입 의사 확인, 본인 식별·인증, 서비스 부정이용 방지, 고충처리</li>
              <li><strong className="text-[#141b26]">서비스 개선 및 분석:</strong> 매치업 시뮬레이션 등 서비스 이용 통계 및 맞춤형 환경 제공</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              2. 처리하는 개인정보의 항목
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium pl-5">
              <li><strong className="text-[#141b26]">회원 가입 시 수집 항목:</strong> 이메일 주소, 비밀번호, 닉네임</li>
              <li><strong className="text-[#141b26]">자동 수집 항목:</strong> 접속 IP 주소, 쿠키, 서비스 이용 기록, 접속 로그</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              3. 개인정보의 처리 및 보유 기간
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium pl-5">
              <li><strong className="text-[#141b26]">회원 가입 및 관리:</strong> 회원 탈퇴 시까지 (단, 관계 법령 위반 수사 시 해당 종료 시까지 보관)</li>
              <li><strong className="text-[#141b26]">서비스 관련 기록:</strong> 3개월 (통신비밀보호법)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              4. 개인정보의 파기 절차 및 방법
            </h3>
            <p className="text-gray-600 font-medium leading-relaxed pl-5">
              Goalytics는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              5. 개인정보의 제3자 제공 및 위탁
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium pl-5">
              <li><strong className="text-[#141b26]">제3자 제공:</strong> 현재 Goalytics는 이용자의 개인정보를 제3자에게 제공하지 않습니다.</li>
              <li><strong className="text-[#141b26]">처리 위탁:</strong> 원활한 서비스 제공을 위해 Google Cloud Platform(GCP)에 데이터 보관 및 시스템 운영을 위탁하고 있습니다.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              6. 안전성 확보조치 및 권리 행사
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium pl-5">
              <li><strong className="text-[#141b26]">안전성 확보조치:</strong> 내부관리계획 수립, 접근권한 관리, 고유식별정보 등의 암호화, 보안프로그램 설치를 통해 안전하게 관리합니다.</li>
              <li><strong className="text-[#141b26]">권리 행사:</strong> 정보주체는 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 서면, 전자우편 등을 통해 행사할 수 있습니다.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              7. 개인정보 보호책임자 및 권익침해 구제
            </h3>
            <div className="bg-gray-50 p-6 rounded-2xl text-gray-600 font-medium space-y-3 ml-5 border border-gray-100">
              <p><strong className="text-[#141b26] text-lg">개인정보 보호책임자:</strong> 이건용</p>
              <p><strong className="text-[#141b26] text-lg">이메일:</strong> rjsdyd0113@naver.com</p>
              <p className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.<br/>
                - 개인정보분쟁조정위원회 (국번없이 1833-6972)<br/>
                - 개인정보침해신고센터 (국번없이 118)<br/>
                - 경찰청 (국번없이 182)
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#141b26] flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <span className="w-2 h-8 bg-[#41e307] rounded-full"></span>
              8. 개인정보 처리방침의 변경
            </h3>
            <p className="text-gray-600 font-medium pl-5">
              이 개인정보 처리방침은 <strong>2026년 11월 9일</strong>부터 적용됩니다.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}