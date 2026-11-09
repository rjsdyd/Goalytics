# ⚽ Goalytics (Ongoing Project)

실시간 축구 경기 데이터와 다개년(2021~2025) 리그 순위 히스토리, 그리고 **Gemini AI 기반 전술 분석 및 가상 매치업 시뮬레이터**를 제공하는 풀스택 축구 대시보드 플랫폼입니다. 현재 활발하게 개발 및 고도화가 진행 중인 프로젝트입니다.

---

## 🛠️ Tech Stack

### Frontend
*   **Core:** React, TypeScript
*   **Styling:** TailwindCSS, Bento Grid 레이아웃
*   **State Management:** Context API (`ModeContext` 기반 테마 변경)
*   **Routing:** React Router (`react-router-dom`)
*   **Network:** Axios
*   **Data Parsing:** Custom Regex Parser (AI 마크다운 데이터 UI 렌더링)

### Backend
*   **Framework:** NestJS (TypeScript)
*   **Database & ORM:** MariaDB, TypeORM
*   **AI Integration:** Google Gemini API (`@google/generative-ai`)
*   **Data API & Integration:** API-Football, `axios`, `@nestjs/schedule` (Cron)
*   **Security & Config:** `@nestjs/config` (환경변수 관리), JWT (Auth)

---

## 📌 Key Features

### 1. AI 전술 브리핑 및 가상 매치업 시뮬레이터 (New)
*   **Gemini AI 연동:** 특정 클럽/국가대표팀의 전술적 강점, 약점, 공략법을 AI가 실시간으로 분석하여 마크다운 형태로 제공.
*   **가상 매치업 모달:** 사용자가 임의의 두 팀을 선택하면 AI가 전술적 상성과 예상 스코어를 예측.
*   **온디맨드 DB 캐싱 전략:** API 일일 할당량 한계 극복 및 응답 속도 최적화를 위해, 한 번 생성된 AI 답변은 MariaDB(`ai_briefings`, `matchup_simulations`)에 즉시 캐싱.
*   **알파벳 정렬 교차 매치업 방어 로직:** 'A팀 vs B팀'과 'B팀 vs A팀'의 중복 API 호출을 막기 위해 백엔드 컨트롤러에서 두 팀 이름을 배열로 묶어 알파벳 정렬 후 Unique Key로 생성.
*   **자체 정규식 파서:** AI가 반환하는 불규칙한 마크다운(`#`, `**`, `-`) 텍스트를 정규식으로 직접 파싱하여 커스텀 아이콘과 컬러가 들어간 직관적인 React UI 컴포넌트로 렌더링.

### 2. 벤토 그리드 및 동적 테마 기반 반응형 대시보드
*   다양한 축구 통계(Live Score, Standings, Top Scorer 등)를 벤토 그리드(Bento Grid) 레이아웃으로 직관적으로 배치.
*   `ModeContext`를 활용하여 사용자가 선택한 모드(리그, 챔피언스리그, 국가대표)에 따라 서비스 메인 테마 컬러가 실시간으로 전환되는 전역 상태 관리 구현.

### 3. 컴포넌트 기반 모듈화 아키텍처
*   프론트엔드 UI를 독립적인 컴포넌트(`Header`, `LiveMatch`, `Standings`, `MiniStats` 등)로 분리하여 유지보수성 및 코드 가독성 향상.
*   `React Router`를 통한 대시보드와 리그 페이지 간 SPA 라우팅 구현.
*   백엔드 역시 NestJS의 강력한 모듈화(Modularity)를 활용하여 `ai`, `matchup`, `football`, `auth` 등의 도메인으로 비즈니스 로직을 완벽히 격리 및 설계.

### 4. 다개년 시계열 순위 데이터베이스 설계
*   팀 ID(`team_id`)와 시즌 연도(`season`)를 결합한 복합키(Composite Primary Key) 구조의 `Standing` 엔티티 설계.
*   'View Full Table' 모달 및 연도별 탭 시스템을 통해 2021~2025 시즌별 순위 히스토리 탐색 기능 제공.
*   스케줄러(`@nestjs/schedule`) 및 API ID 기반 Upsert 구조를 통해 데이터 중복 적재 원천 차단.

### 5. 엔터프라이즈급 보안 및 예외 처리
*   `@nestjs/config`를 활용해 DB 접속 정보 및 외부 API Key를 소스 코드에서 완전히 분리하고 `.env` 기반 안전한 환경변수 주입 적용.
*   글로벌 AI 서버 과부하(503, 429 에러) 발생 시 서버 다운을 방지하기 위한 Try-Catch 예외 처리 및 사용자 친화적 에러 메시지 반환 로직 구축.
