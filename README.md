# ⚽ Goalytics

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

## FrontEnd 디렉토리
```
FrontEnd/
├── node_modules/
├── public/
│   ├── favicon.svg
│   ├── football.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── axios.ts
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── ContinentalCupCard.tsx
│   │   ├── FifaRankingCard.tsx
│   │   ├── Header.tsx
│   │   ├── History.tsx
│   │   ├── LiveMatch.tsx
│   │   ├── MatchupModal.tsx
│   │   ├── MiniStats.tsx
│   │   ├── ModeSelector.tsx
│   │   ├── Mypage.tsx
│   │   ├── NationalContent.tsx
│   │   ├── NewsWidget.tsx
│   │   ├── UCLContent.tsx
│   │   ├── UELContent.tsx
│   │   └── WorldCupCard.tsx
│   ├── data/
│   │   ├── leagueStatsData.ts
│   │   ├── nationalData.ts
│   │   ├── nationsData.ts
│   │   ├── uclData.ts
│   │   └── uelData.ts
│   ├── pages/
│   │   ├── AdminPage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── LeaguesPage.tsx
│   │   ├── NationDetail.tsx
│   │   ├── Nations.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsOfService.tsx
│   │   └── TierMaker.tsx
│   ├── store/
│   │   └── authStore.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```
## Backend 디렉토리
```
Backend/
├── dist/
├── node_modules/
├── src/
│   ├── ai/
│   │   ├── entities/
│   │   │   └── ai-briefing.entity.ts
│   │   ├── ai.controller.ts
│   │   ├── ai.module.ts
│   │   └── ai.service.ts
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── jwt-auth.guard.ts
│   ├── football/
│   │   ├── entities/
│   │   │   ├── fixture.entity.ts
│   │   │   ├── league.entity.ts
│   │   │   └── standing.entity.ts
│   │   ├── football.controller.spec.ts
│   │   ├── football.controller.ts
│   │   ├── football.module.ts
│   │   ├── football.service.spec.ts
│   │   └── football.service.ts
│   ├── inquiries/
│   │   ├── entities/
│   │   │   └── inquiry.entity.ts
│   │   ├── inquiries.controller.ts
│   │   ├── inquiries.module.ts
│   │   └── inquiries.service.ts
│   ├── matchup/
│   │   ├── entities/
│   │   │   └── matchup.entity.ts
│   │   ├── matchup.controller.ts
│   │   ├── matchup.module.ts
│   │   └── matchup.service.ts
│   ├── mypage/
│   │   ├── entities/
│   │   │   └── mypage.entity.ts
│   │   ├── mypage.controller.ts
│   │   ├── mypage.module.ts
│   │   └── mypage.service.ts
│   ├── teams/
│   │   ├── entities/
│   │   │   ├── league.entity.ts
│   │   │   └── team.entity.ts
│   │   ├── teams.controller.ts
│   │   ├── teams.module.ts
│   │   └── teams.service.ts
│   ├── tier/
│   │   ├── dto/
│   │   │   └── save-tier.dto.ts
│   │   ├── entities/
│   │   │   └── tier.entity.ts
│   │   ├── tier.controller.ts
│   │   ├── tier.module.ts
│   │   └── tier.service.ts
│   ├── users/
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── .env
├── .gitattributes
├── .gitignore
├── .oxlintrc.json
├── .prettierrc
├── AGENTS.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.build.tsbuildinfo
├── tsconfig.json
├── vitest.config.e2e.ts
└── vitest.config.ts
```
## ERD
<img width="1156" height="1472" alt="image" src="https://github.com/user-attachments/assets/3b293943-9d4e-4212-9800-1cad7a52e233" />

### 1. 설계 개요
Goalytics의 백엔드(NestJS + TypeORM)를 지탱하는 관계형 데이터베이스(RDBMS) 모델링입니다. 서비스의 확장성을 고려하여 도메인별로 테이블을 분리하고, 외부 API 호출 비용을 줄이기 위한 데이터 캐싱(Caching)과 유연한 JSON 타입 컬럼 활용에 중점을 두어 설계했습니다.[cite: 13]

### 2. 핵심 도메인별 설계 의도

*   **👤 회원 및 사용자 활동 (Users & Logs)**
    *   `users`: JWT 인증 기반의 회원 정보를 관리하며, 보안을 위해 비밀번호는 해싱 처리하여 저장합니다.
    *   `mypage_logs`: 사용자의 주요 서비스 이용 기록(티어 저장, 매치업 시뮬레이션 등)을 추적하여 향후 개인화된 데이터를 제공하기 위한 기반을 마련했습니다.
*   **⚽ 마스터 데이터 (Teams & Leagues)**
    *   `leagues` & `teams`: 서비스의 뼈대가 되는 축구 클럽과 국가대표팀, 소속 리그 정보를 자체 DB에 구축했습니다. 프론트엔드가 외부 API에 직접 의존하지 않게 하여 네트워크 지연(Latency)을 없애고 렌더링 속도를 극대화했습니다.
*   **🤖 AI 분석 및 캐싱 (AI Briefings & Matchups)**
    *   `ai_briefings` (1:1 관계): 특정 팀의 전술 분석 데이터를 저장합니다. 한 팀당 하나의 최신 리포트만 유지하도록 `team_id`에 Unique 제약 조건을 걸어 무결성을 확보했습니다.
    *   **JSON 컬럼 활용:** AI가 반환하는 복잡한 다차원 구조의 응답 데이터(강점, 약점, 예상 스코어 등)를 RDBMS에 억지로 정규화하지 않고, `json` 타입 컬럼(`report_data`, `simulation_data`)으로 유연하게 적재하여 조회 성능을 높이고 스키마 변경에 대한 부담을 줄였습니다.
*   **👑 사용자 생성 콘텐츠 (Tiers & Inquiries)**
    *   `tiers`: 유저가 '나만의 티어 메이커'에서 드래그 앤 드롭으로 완성한 S~D 등급 배치 현황을 JSON 형태로 저장합니다. 유저(User)와 1:N 관계를 가지며 데이터 영속성을 보장합니다.
    *   `inquiries`: 서비스 개선을 위한 유저 피드백을 카테고리별로 수집하여 운영 및 유지보수 효율을 높였습니다.
*   **📊 축구 통계 데이터 (Fixtures & Standings)**
    *   `fixtures` (경기 일정)와 `standings` (순위표): 클럽과 리그 데이터를 참조(Foreign Key)하여 실시간 축구 데이터를 정형화하여 관리합니다.

## AI

### 1. 시스템 개요 (Overview)

Goalytics는 단순한 축구 데이터 조회를 넘어, Google Gemini API (3.5 Flash 모델)를 활용해 심도 있는 전술 분석과 가상 매치업 결과를 제공합니다.[cite: 14] 실시간 AI 텍스트 생성의 한계(긴 응답 시간, API 호출 비용, 서버 과부하)를 극복하기 위해 온디맨드 캐싱(On-demand Caching)과 알고리즘 기반 키 최적화를 백엔드(NestJS + TypeORM)에 적극적으로 적용했습니다.

### 2. 핵심 AI 기능 명세

#### A. AI 팀 전술 분석 리포트 (Tactical Briefing)

특정 클럽이나 국가대표팀의 상세 페이지 진입 시, 해당 팀의 최신 전술 기조, 강점, 약점, 상대팀 입장에서의 공략법을 제공하는 기능입니다.

*   **작동 플로우:**
    1.  유저가 특정 팀(예: 맨체스터 시티) 상세 페이지 접근
    2.  프론트엔드에서 백엔드로 `GET /ai/tactics?team=맨체스터 시티` 요청
    3.  백엔드에서 `ai_briefings` 테이블 조회 (팀 이름을 Unique Key로 사용)
    4.  [Cache Hit] 데이터가 존재하면 즉시(0.1초) DB에서 꺼내와 프론트엔드로 반환
    5.  [Cache Miss] 데이터가 없으면 Gemini API를 호출하여 프롬프트 전송
    6.  생성된 마크다운 텍스트를 DB에 `save()` 한 후 프론트엔드로 반환
*   **기술적 구현 포인트 (프론트엔드 UI 파싱):**
    *   AI가 유동적으로 뱉어내는 마크다운 기호(`#`, `*`, `**`)를 프론트엔드 정규식(Regex) 파서를 통해 시각적인 UI 컴포넌트로 변환.
    *   단순 텍스트 렌더링이 아닌, 커스텀 아이콘(⚔️, ⚡)과 테마 컬러(리그는 녹색, 국가는 보라색)가 적용된 카드형 레이아웃으로 동적 매핑.

#### B. 가상 매치업 시뮬레이터 (Virtual Matchup Simulator)

사용자가 임의의 두 팀(클럽 vs 클럽, 국가 vs 국가)을 선택하면, AI가 두 팀의 전술적 상성을 분석하고 예상 경기 흐름과 최종 스코어를 예측해 주는 엔터테인먼트 기능입니다.
*   **작동 플로우:**
    1.  헤더의 `Matchup` 버튼을 통해 전역 모달(Modal) 창 오픈
    2.  리그/국가 카테고리 선택 후 팀 A, 팀 B 지정 (카테고리 전환 시 상태 초기화 로직 적용)
    3.  `GET /matchup?teamA=A팀&teamB=B팀&category=리그/국가` 요청
    4.  교차 매치업 캐싱 방어 로직 통과 후 DB 조회 결과 반환 (이하 A 기능과 동일)
*   **기술적 구현 포인트 (교차 매치업 캐싱 알고리즘):**
    *   문제점: 150여 개 팀의 매치업 경우의 수는 약 11,000개 이상이며, 'A팀 vs B팀'과 'B팀 vs A팀'이 중복으로 API를 호출할 위험 존재.
    *   해결책: 백엔드 컨트롤러에서 두 팀의 이름을 배열에 담아 알파벳/가나다순으로 정렬(Sort)하여 단일 Unique Key 생성.
    *   `[팀A, 팀B].sort() -> category_Team1_Team2` (예: `league_Arsenal_Barcelona`). 이를 통해 검색 순서와 무관하게 완벽한 중복 호출 차단.

### 3. 코어 아키텍처 및 트러블슈팅 (Technical Highlights)

#### ① 비용 및 트래픽 최적화 (Lazy Loading & Caching)
*   모든 AI 데이터를 사전에 구축(Pre-fetch)하지 않고, 사용자가 조회하는 시점(On-demand)에만 API를 호출하도록 설계했습니다.
*   성과: 빅매치('맨시티 vs 레알' 등)의 경우 특정 유저가 1회만 검색해 두면, 이후 10만 명의 유저가 조회해도 API 호출 횟수는 0회로 고정됩니다. 하루 1,500회의 무료 API 할당량(Quota) 내에서 무제한에 가까운 트래픽을 완벽하게 수용할 수 있는 아키텍처를 완성했습니다.

#### ② 외부 API 장애 격리 (Fault Tolerance)
*   문제: 글로벌 트래픽 폭주로 인한 Gemini 모델 서버 에러(503 Service Unavailable) 및 단기 호출 제한(429 Too Many Requests) 발생.
*   해결: `try-catch` 블록 내에서 외부 에러 코드를 감지하고 분기 처리. 서버 다운을 방지하고 프론트엔드에 사용자 친화적인 안내 메시지("현재 AI 서버 과부하로 지연되고 있습니다")를 반환합니다.
*   데이터 오염 방지: 에러 발생 시에는 비정상적인 결과값이 DB 캐시 테이블에 `save()` 되지 않도록 로직을 차단하여 데이터 정합성을 유지합니다.

#### ③ 프롬프트 엔지니어링 (Prompt Engineering)
*   AI에게 "당신은 세계 최고의 축구 전술 분석관이자 해설가입니다"라는 페르소나(Persona)를 부여하여 답변의 전문성을 높였습니다.
*   출력 형식을 강제하기 위해 `[전술적 상성]`, `[예상 경기 양상]`, `[AI 예측 결과]` 등의 필수 포함 헤딩(Heading)을 프롬프트에 명시하여, 프론트엔드 파서가 일관된 UI를 그릴 수 있도록 제어했습니다.

## Troubleshooting

### 1. TypeORM 엔티티 중복 선언 및 DB 제약조건 충돌 에러
*   **문제 현상:** 회원가입 시 `Field 'password' doesn't have a default value` 및 `Data truncated for column 'password'` 에러 발생. 서버를 재시작하거나 새 계정으로 가입할 때마다 기존 계정의 `password_hash`와 `nickname` 데이터가 DB에서 초기화(삭제)되는 현상 발생.
*   **원인 추적:** 프로젝트 내에 `User` 엔티티가 두 곳(`user.entity.ts`, `mypage.entity.ts`)에 중복으로 선언되어 있었음. TypeORM의 `synchronize: true` 옵션이 켜진 상태에서, `password_hash` 필드가 없는 가짜 User 엔티티(`mypage.entity.ts`)를 기준으로 테이블 구조를 억지로 덮어씌우면서 기존 데이터가 파괴되고 제약조건 충돌이 발생함.
*   **해결 방법:** 
    1. `mypage.entity.ts` 내의 중복된 User 클래스를 완전히 삭제하고 위시리스트 엔티티만 유지.
    2. `mypage.module.ts`와 `mypage.service.ts`에서 진짜 엔티티인 `../users/entities/user.entity.ts`를 import 하도록 경로를 분리 및 수정.
    3. 데이터베이스 툴(HeidiSQL)에서 깨진 데이터를 정리하고 재가입하여 정상 작동 확인 완료.

### 2. JWT 토큰 누락으로 인한 인가(Authorization) 실패
*   **문제 현상:** 마이페이지 진입 시 백엔드 API가 데이터를 제대로 반환하지 못함. 국가 상세페이지에서 즐겨찾기(⭐) 추가/해제 버튼이 전혀 작동하지 않음.
*   **원인 추적:** 프론트엔드(`MyPage.tsx`, `NationDetail.tsx`)에서 axios를 통해 백엔드로 API 요청을 보낼 때, 헤더(Header)에 로그인 인증 토큰을 싣지 않고 요청을 보냄. 백엔드에서는 토큰이 없으므로 401(Unauthorized) 처리하거나 요청을 무시함.
*   **해결 방법:** 로그인/회원가입 시 `localStorage`에 저장해둔 `access_token`을 불러와, API 요청 옵션에 `headers: { Authorization: 'Bearer ${token}' }`를 명시적으로 추가하여 권한 증명(Payload 전달) 성공.

### 3. 백엔드 컨트롤러 유저 ID 하드코딩 이슈 (데이터 혼선)
*   **문제 현상:** 다른 계정으로 로그인을 해도 마이페이지에는 '테스트계정'의 데이터와 위시리스트가 뜨는 등, 어떤 계정으로 로그인하든 동일한 데이터만 조회됨.
*   **원인 추적:** 백엔드 `mypage.controller.ts`의 모든 라우트에서 `this.mypageService.getProfile(1)`과 같이 유저 ID(`userId`)를 `1`로 하드코딩하여 서비스 계층에 넘겨주고 있었음.
*   **해결 방법:** 프론트엔드에서 넘어온 JWT 토큰(Authorization 헤더)을 백엔드에서 디코딩하는 `getUserIdFromToken` 헬퍼 함수를 컨트롤러에 구현. 디코딩된 페이로드에서 고유 ID(`sub`)를 추출하여 해당 유저의 식별자로 동적 할당하도록 전면 리팩토링.

### 4. 프론트엔드 UI 하드코딩 및 상태 동기화 문제
*   **문제 현상:** 로그인에 성공해도 상단 헤더에 "Mancity님 환영합니다!", 마이페이지 프로필에 "테스트계정" 등 하드코딩된 텍스트가 계속 고정되어 있음. 다른 계정으로 로그인 후 다시 돌아왔을 때 이전 계정 정보가 남는 현상 발생.
*   **원인 추적:** React 컴포넌트가 실제 사용자 데이터를 상태(State)로 관리하지 않고 정적 텍스트를 렌더링하고 있었음.
*   **해결 방법:** `useEffect`를 활용해 컴포넌트 마운트 시 `localStorage.getItem('nickname')`을 읽어와 `nickname` 상태(State)를 업데이트하고 동적 렌더링 적용. 로그아웃 시 `localStorage.clear()`를 호출하여 스토리지에 남은 토큰과 닉네임 데이터를 완벽히 초기화.

### 5. TypeORM 버전 차이로 인한 select 옵션 문법 에러
*   **문제 현상:** 백엔드 `users.service.ts` 파일에서 전체 유저 목록을 조회하는 `findAllUsers` 메서드 작성 중, TypeORM의 `find` 메서드 내 `select` 옵션에서 TypeScript 에러(`ts(2559)`) 발생.
*   **원인 추적:** TypeORM 라이브러리의 버전(0.3.x 이상) 업데이트로 인해 `find` 쿼리 작성 시 `select` 옵션의 허용 문법이 변경됨. 이전 버전에서는 배열 형태(`['id', 'email']`)를 지원했으나, 최신 버전의 인터페이스(`FindOptionsSelect`)에서는 이를 더 이상 지원하지 않아 타입 불일치 에러가 발생함.
*   **해결 방법:** `select` 옵션에 전달하는 값을 배열(`[]`) 대신 객체(`{}`) 형태로 변경하여, 반환받고자 하는 각 컬럼을 명시적으로 `true`로 설정하도록 코드 수정.
    ```typescript
    // ❌ AS-IS (에러 발생 코드)
    return this.userRepository.find({
      select: ['id', 'email', 'nickname', 'role', 'created_at'], 
      order: { created_at: 'DESC' },
    });

    // ✅ TO-BE (해결된 코드)
    return this.userRepository.find({
      select: { 
        id: true,
        email: true,
        nickname: true,
        role: true,
        created_at: true,
      },
      order: { created_at: 'DESC' },
    });
    ```

### 6. Gemini API 모델 버전 및 서버 에러 대응
*   **이슈 1: 404 Not Found (모델 인식 불가)**
    *   **원인:** 초기 설정한 `1.5-flash` 및 `pro` 모델이 최신 API 키 환경에서 지원되지 않거나 Deprecated 됨.
    *   **해결:** `OnModuleInit`을 활용해 현재 API 키로 접근 가능한 모델 목록을 동적으로 확인. 구글 정책 변경 안내에 따라 최종적으로 `gemini-3.5-flash` 모델을 채택하여 안정화.
*   **이슈 2: 503 Service Unavailable (서버 과부하)**
    *   **원인:** 구글 Gemini 서버의 글로벌 트래픽 급증으로 인한 일시적 응답 불가 현상.
    *   **해결:** NestJS `AiService` 내에 503(과부하) 및 429(할당량 초과) 에러 코드를 감지하는 `try-catch` 예외 처리 로직 추가. 서버 다운을 방지하고 프론트엔드에 안전한 안내 문구를 반환하도록 방어벽 구축.

### 7. 404 Not Found: 전체 팀 데이터 로드 실패 (티어 메이커)
*   **원인:** 프론트엔드가 요청한 URL(`http://localhost:3000/leagues/teams`)과 백엔드 컨트롤러에 실제로 구현된 라우터가 일치하지 않았음. 또한, 백엔드 서비스 코드에 레포지토리 오타(`teamRepository` vs `teamsRepository`)가 존재함.
*   **해결:** `TeamsController`에 `@Get()`을 추가해 `/teams` 경로를 오픈하고, 프론트엔드의 `masterApiUrl`을 이에 맞게 수정. 레포지토리 오타 교정 완료.

### 8. 400 Bad Request: 데이터 저장 실패 (티어 메이커)
*   **원인:** 프론트엔드에서 API 요청 시 JWT 토큰을 넘겨주었으나, 백엔드 `auth` 폴더에 실제 토큰을 해독하고 검증할 `JwtAuthGuard` 가드(Guard) 파일이 누락되어 요청이 반려됨.
*   **해결:** `src/auth/jwt-auth.guard.ts` 파일을 신규 생성하여 토큰 검증 로직(`extractTokenFromHeader` 및 `verifyAsync`)을 구현하고, `TierModule`에 `JwtModule`을 import 시켜 인증 파이프라인을 정상화함.

## 1. 메인 대시보드 (Main Dashboard)
<img width="1901" height="907" alt="image" src="https://github.com/user-attachments/assets/ababfe48-d969-4768-b7ab-59133f3e226a" />

**1. 화면 개요**
사용자가 로그인 후 가장 먼저 마주하는 메인 홈 화면으로, 글로벌 축구계의 주요 데이터(경기 일정, 순위, 뉴스 등)를 한눈에 파악할 수 있도록 **위젯(Widget) 형태로 모듈화된 대시보드**를 제공합니다.

**2. 주요 기능 (Features)**

*   **실시간 뉴스 연동 (Latest News & Transfers):** 
    최신 글로벌 축구계 및 이적시장 소식을 썸네일, 언론사 출처, 발행일과 함께 직관적인 카드 그리드 형태로 제공합니다.
*   **다이나믹 대시보드 모드 전환 (Select Dashboard Mode):** 
    사용자의 관심사에 따라 대시보드의 데이터를 '5대 리그', '챔피언스리그(UCL)', '유로파리그(UEL)', '국가대표(A매치)' 모드로 즉각 전환할 수 있는 컨트롤러 패널을 구현했습니다.
*   **요약 위젯 시스템 (Summary Widgets):**
    *   **리그별 경기 일정:** 당일 예정된 주요 경기 일정을 렌더링하며, 경기 데이터가 없는 날을 대비한 예외 처리(빈 화면 UI)를 적용했습니다.
    *   **History (미니 순위표):** 상위 6개 팀의 약어, 승점, 최근 전적 흐름(디자인 인디케이터)을 요약하여 보여주는 미니 랭킹 보드입니다.
    *   **Top Scorer 하이라이트:** 브랜드 컬러(Neon Green)를 포인트로 활용하여 시선을 끄는 카드 UI로 주요 선수의 누적 스탯 정보를 제공합니다.
*   **인증 기반 헤더 (Auth Header):** 
    JWT 토큰 페이로드를 기반으로 로그인된 유저의 식별 정보(닉네임)를 동적으로 렌더링하고("일반님 환영합니다!"), 즉각적인 상태 초기화(로그아웃) 기능을 지원합니다.

#### 1-1. History (미니 순위표)
<img width="1902" height="908" alt="image" src="https://github.com/user-attachments/assets/f3916fd3-2b7d-46bf-8202-845129777c9e" />

*   **기능 개요:** 상위 6개 팀의 약어, 승점, 최근 전적 흐름(디자인 인디케이터)을 요약하여 한눈에 보여주는 미니 랭킹 보드입니다.
*   **API 연동 구조:** `API-Football`의 엔드포인트와 연동하여 실시간 축구 데이터를 수급합니다.
    *   API로부터 반환받은 구조화된 `JSON` 배열 데이터(팀명, 승점, 전적 배열 등)를 React의 `.map()` 함수를 활용하여 테이블의 각 행(Row)으로 반복하여 동적 렌더링하도록 구현했습니다.

#### 1-2. Overall Top Scorer
<img width="1901" height="907" alt="image" src="https://github.com/user-attachments/assets/01f785a4-f3a9-4425-968f-46f8617d38d7" />

*   **Top Scorer 하이라이트:** 서비스의 브랜드 컬러(Neon Green)를 포인트 요소로 활용하여 유저의 시선을 끄는 카드 형태의 UI를 적용했으며, 주요 선수의 누적 스탯 정보를 직관적으로 제공합니다.

#### 1-3. Latest News & Transfers
<img width="804" height="380" alt="image" src="https://github.com/user-attachments/assets/124ea852-a344-4937-8638-d8c9edd48674" />

*   **API 쿼리 파라미터(Query Parameter) 제어:** 검색 키워드 파라미터(`?query=`)에 '축구', '해외축구', '이적시장' 등의 고정 키워드를 조합(AND/OR 조건)하여 서버에 최적화된 뉴스 데이터를 요청합니다.
*   **노이즈 데이터 필터링 (Data Filtering):** 정치, 경제 등 불필요한 카테고리의 기사가 섞여 들어오는 것을 사전에 방지하고, 글로벌 축구계 및 K리그의 실시간 소식만 정확하게 필터링되어 렌더링되도록 구현했습니다.

#### 1-4. Select Dashboard Mode
<img width="391" height="377" alt="image" src="https://github.com/user-attachments/assets/c997e1f6-2bf6-43d9-a593-2a9de5e559e9" />

*   **다이나믹 테마 전환:** 4가지 카테고리 테마를 선택하여 대시보드 전체의 데이터 뷰를 즉각적으로 변경할 수 있도록 상태(State)를 제어합니다.
*   **외부 API 기반 에셋 렌더링:** 챔피언스리그(UCL) 및 유로파리그(UEL)의 공식 로고 등은 `API-Football` API를 연동하여 정확한 리소스를 동적으로 불러와 구현했습니다.

#### 1-5. Leages
<img width="1024" height="487" alt="image" src="https://github.com/user-attachments/assets/9718a0f5-cc43-423b-b075-2ae76155ecce" />
<img width="1024" height="489" alt="image" src="https://github.com/user-attachments/assets/17feb46a-a17b-4394-a9dd-fdd28e0af408" />
<img width="512" height="244" alt="image" src="https://github.com/user-attachments/assets/3b879c08-74af-4272-a33c-a3857d3b3cac" />
<img width="512" height="246" alt="image" src="https://github.com/user-attachments/assets/d5c029aa-2c9c-43dd-b9af-021961cce787" />
<img width="512" height="245" alt="image" src="https://github.com/user-attachments/assets/59144f41-584b-4896-bf01-685d4a656c12" />

*   (API-Football) API를 사용하여 각 리그의 로고와 팀들의 로고를 버튼으로 구현

#### 1-6. Leagues Team 상세 페이지
<img width="446" height="773" alt="image" src="https://github.com/user-attachments/assets/0e3563dd-1b78-4415-8cd1-ab8ab515b4b8" />
<img width="430" height="701" alt="image" src="https://github.com/user-attachments/assets/84dc7a56-b7d4-439d-b563-00bf7c6cb864" />

*   **팀 기본 정보 (창단 연도, 홈 구장, 감독):** `API-Football` API를 호출하여 최신 데이터를 동적으로 연동합니다.
*   **팀 설명 및 역대 주요 순위 (득점/도움):** 업데이트 빈도가 낮은 콜드 데이터(Cold Data)의 특성을 고려하여, 하드코딩 방식으로 고속 렌더링되도록 최적화했습니다.

**🤖 Goalytics AI 전술 리포트 아키텍처**

*   **Step 1: 프롬프트 엔지니어링 (Prompt Engineering)**
    *   프론트엔드에서 팀 이름(예: 파리 생제르맹 FC)을 백엔드로 넘기면, NestJS 서버에서 사전 설계된 시스템 프롬프트(System Prompt)에 팀명을 주입합니다.
    *   **설계 포인트:** AI가 매번 일관된 형식으로 답변하도록 *"반드시 1. 전술적 구조, 2. 팀의 핵심 강점, 3. 상대팀 입장의 약점 및 공략법 3가지 섹션으로 나누어 JSON 형태로 반환하라"*고 프롬프트를 엄격하게 제어(Structured Output)합니다.
*   **Step 2: DB 캐싱을 통한 API 최적화 (Caching Strategy)**
    *   **Cache Hit:** 백엔드는 외부 AI API를 무조건 호출하지 않고, 먼저 자체 DB에 해당 클럽의 분석 데이터가 존재하는지 조회합니다. 저장된 데이터가 있다면 API 호출 없이 DB 데이터를 즉각 반환하여 로딩 시간을 대폭 단축합니다.
    *   **Cache Miss:** DB에 데이터가 없는 최초 요청의 경우에만 외부 AI API를 호출하여 결과를 받아오고, 향후 동일한 요청에 대비해 그 결과를 DB에 새롭게 적재(Insert)하여 API 호출 비용을 절감합니다.
*   **Step 3: 응답 데이터 파싱 및 컴포넌트 매핑 (Parsing & Mapping)**
    *   백엔드로부터 전달받은 구조화된 데이터를 React 상태(State)에 저장합니다.
    *   통짜 텍스트 렌더링을 지양하고, 데이터의 Key 값에 따라 커스텀 UI 컴포넌트(예: 좌측 네온 그린 바(Bar) 헤더, 체크마크 아이콘 리스트 박스)에 매핑하여 가독성을 높였습니다.
*   **Step 4: 핵심 키워드 하이라이팅 적용 (Keyword Highlighting)**
    *   사용자의 시선을 유도하기 위해 리포트 내의 핵심 전술 용어나 포인트(예: '하키미가 비운 측면 배후 공간')를 정규표현식(Regex)으로 파싱하거나 AI의 태그 마크업을 활용하여, 브랜드 컬러를 배경으로 한 하이라이트 UI 컴포넌트로 동적 치환했습니다.
 
### 2. 챔피언스 리그 대시보드
<img width="1899" height="908" alt="image" src="https://github.com/user-attachments/assets/d1f74623-8ecd-45eb-8e31-9d4aa76cb3dd" />
<img width="1901" height="907" alt="image" src="https://github.com/user-attachments/assets/7e02a186-1f78-43de-a3e7-4674d5fcdf59" />
<img width="1898" height="905" alt="image" src="https://github.com/user-attachments/assets/f310f3e5-d1cb-453c-aae5-25b255072606" />
<img width="1901" height="908" alt="image" src="https://github.com/user-attachments/assets/3b7b6325-1a02-426f-98dd-0fe8d9ad47ef" />

*   챔피언스 리그 브랜드 컬러에 맞게끔 챔스 브랜드 컬러를 적용

### 3. 유로파 리그 대시보드
<img width="1899" height="907" alt="image" src="https://github.com/user-attachments/assets/953090ad-148b-4e3b-83d6-e554d0e30e06" />
<img width="1901" height="907" alt="image" src="https://github.com/user-attachments/assets/1e7d7170-2c5f-4a4e-a0e8-9e24e3d25a75" />
<img width="1903" height="905" alt="image" src="https://github.com/user-attachments/assets/a271d85a-cf26-4cc2-b43f-4c52e25a89f2" />

*   유로파 리그 브랜드 컬러에 맞게끔 유로파 브랜드 컬러를 적용

### 4. 국가대표 대시보드
<img width="1903" height="906" alt="image" src="https://github.com/user-attachments/assets/b750c97f-25b2-4e3a-9fee-29eed1472262" />
<img width="1901" height="910" alt="image" src="https://github.com/user-attachments/assets/f9c7a313-7e0b-487e-99a9-efaed2ff3c79" />
<img width="1900" height="907" alt="image" src="https://github.com/user-attachments/assets/d6f124c1-f368-4f88-aca9-6b39da038dda" />
<img width="1902" height="908" alt="image" src="https://github.com/user-attachments/assets/edf2dfd1-3890-4e8c-b061-6580d6c4dc03" />

#### 4-1. 국가 (Nations)
<img width="1024" height="489" alt="image" src="https://github.com/user-attachments/assets/9e2cca21-2efe-4316-8f23-a2fd787cd344" />
<img width="1024" height="489" alt="image" src="https://github.com/user-attachments/assets/be13bc2b-5f7b-4a31-9436-48c03890328d" />
<img width="512" height="246" alt="image" src="https://github.com/user-attachments/assets/813d6688-f400-47a9-88a2-4e892a908dec" />
<img width="512" height="245" alt="image" src="https://github.com/user-attachments/assets/afd7a561-2c50-47c1-94c4-5ea95845d8d8" />
<img width="512" height="244" alt="image" src="https://github.com/user-attachments/assets/c78c8ed3-ba8c-40e6-8795-51f3707109cb" />

*   **Flag CDN 도입:** 
    *   국가대표 국기 로고를 렌더링할 때, 수많은 이미지 파일을 자체 서버(DB나 AWS S3 등)에 직접 저장하고 서빙하는 대신 별도의 인증(API Key)이 필요 없는 **완전 개방형 퍼블릭 CDN(Flag CDN)**을 적극 활용했습니다.
 
#### 4-2. 국가 상세 페이지 (Nation Detail Page)
<img width="415" height="790" alt="image" src="https://github.com/user-attachments/assets/40919b05-502e-40d7-9ebe-7d5f34e7c46d" />
<img width="431" height="556" alt="image" src="https://github.com/user-attachments/assets/7e87a6d0-c04f-47dc-8d45-64f162afd944" />

*   **국가 기본 정보 (창단 연도, 홈 구장, 감독):** `API-Football` API를 호출하여 최신 데이터를 동적으로 연동합니다.
*   **팀 설명 및 역대 주요 순위 (득점/도움):** 업데이트 빈도가 낮은 콜드 데이터(Cold Data)의 특성을 고려하여, 하드코딩 방식으로 고속 렌더링되도록 최적화했습니다.

**🤖 Goalytics AI 전술 리포트 아키텍처**

*   **Step 1: 프롬프트 엔지니어링 (Prompt Engineering)**
    *   프론트엔드에서 국가대표팀 이름(예: 프랑스, 아르헨티나 등)을 백엔드로 넘기면, NestJS 서버에서 사전 설계된 시스템 프롬프트(System Prompt)에 팀명을 주입합니다.
    *   **설계 포인트:** AI가 매번 일관된 형식으로 답변하도록 *"반드시 1. 전술적 구조, 2. 팀의 핵심 강점, 3. 상대팀 입장의 약점 및 공략법 3가지 섹션으로 나누어 JSON 형태로 반환하라"*고 프롬프트를 엄격하게 제어(Structured Output)합니다.
*   **Step 2: DB 캐싱을 통한 API 최적화 (Caching Strategy)**
    *   **Cache Hit:** 백엔드는 외부 AI API를 무작정 호출하지 않고, 먼저 자체 DB에 해당 국가의 분석 데이터가 존재하는지 조회합니다. 이미 저장된 데이터가 있다면 API 호출 없이 DB 데이터를 즉각 반환하여 로딩을 생략합니다.
    *   **Cache Miss:** DB에 데이터가 없는 최초 요청의 경우에만 외부 AI API를 호출하여 결과를 받아오고, 향후 동일한 요청에 대비해 그 결과를 DB에 새롭게 적재(Insert)합니다.
*   **Step 3: 응답 데이터 파싱 및 컴포넌트 매핑 (Parsing & Mapping)**
    *   백엔드로부터 전달받은 구조화된 데이터를 React 상태(State)에 저장합니다.
    *   화면에 렌더링할 때 통짜 텍스트를 그대로 박지 않고, 데이터의 Key 값에 따라 커스텀 UI 컴포넌트(예: 좌측 네온 그린 바(Bar)가 들어간 헤더, 체크마크 아이콘이 포함된 리스트 박스)에 매핑하여 렌더링합니다.
*   **Step 4: 핵심 키워드 하이라이팅 적용 (Keyword Highlighting)**
    *   사용자의 시선을 유도하기 위해 리포트 내의 핵심 전술 용어나 포인트를 정규표현식(Regex)으로 파싱하거나 AI의 태그 마크업을 활용하여 브랜드 컬러를 배경으로 한 하이라이트 UI 컴포넌트로 치환 처리했습니다.
 
### 5. 로그인/회원가입 화면
<img width="1024" height="488" alt="image" src="https://github.com/user-attachments/assets/6288b2aa-a30e-43fb-ba04-a6dc3ca2f739" />
<img width="1024" height="489" alt="image" src="https://github.com/user-attachments/assets/e981cc88-2132-48e8-a49b-f9350c83a449" />

#### 1. 개요
보안성과 서버 확장성을 고려하여 기존의 세션(Session) 기반 인증 대신, JWT(JSON Web Token) 기반의 무상태(Stateless) 인증 아키텍처를 전면 도입하여 회원가입 및 로그인 프로세스를 구현했습니다.

#### 2. 기술적 작동 원리 (JWT Auth Flow)

*   **회원가입 및 단방향 암호화 (Security):** 
    사용자의 비밀번호는 DB에 평문으로 저장하지 않고, 암호화 알고리즘(예: bcrypt)을 통해 해싱 처리하여 데이터베이스 유출 시에도 안전하도록 보안을 강화했습니다.
*   **JWT 발급 로직 (Backend - NestJS):**
    *   사용자가 로그인에 성공하면, NestJS의 `JwtModule`을 활용하여 사용자 식별자(ID)가 담긴 Payload를 서버의 Secret Key로 서명하여 Access Token을 발급합니다.
    *   서버 메모리에 로그인 상태를 따로 기록하지 않아(Stateless), 접속자가 늘어나도 서버 리소스를 낭비하지 않습니다.
*   **프론트엔드 토큰 관리 (Frontend - React):**
    *   발급받은 토큰은 브라우저의 `localStorage`에 안전하게 보관합니다.
    *   사용자가 로그인이 필요한 기능(예: 나만의 티어 저장, 마이페이지 조회 등)을 요청할 때마다, Axios 통신 시 HTTP Header에 `Authorization: Bearer {token}` 형태로 토큰을 동봉하여 서버로 전송합니다.
*   **Custom Guard를 통한 엔드포인트 보호 (API Authorization):**
    *   백엔드에 커스텀 `JwtAuthGuard`를 직접 구현하여 라우터를 보호했습니다.
    *   프론트엔드에서 넘어온 토큰의 위변조 및 만료 여부를 검증하고, 유효하지 않은 토큰(혹은 비로그인 유저)의 접근은 컨트롤러 레이어에 도달하기 전에 즉각적으로 401(Unauthorized) 에러를 반환해 서버를 방어합니다.
 
### 6. 마이페이지 (My Page) - 문의하기 위젯
<img width="1900" height="910" alt="image" src="https://github.com/user-attachments/assets/85ee5be6-383a-4c1f-97d3-55286273091d" />
<img width="1024" height="490" alt="image" src="https://github.com/user-attachments/assets/14d5e911-0576-4ea8-af8c-c8dc9966dd28" />
<img width="1024" height="486" alt="image" src="https://github.com/user-attachments/assets/32a640b2-f977-4053-b4f4-4b96c19030c9" />

**1. 화면 개요**

사용자가 서비스 이용 중 누락된 팀이나 국가의 추가를 요청하거나, 새로운 기능을 제안할 수 있는 '문의하기' 팝업 위젯입니다. 별도의 페이지 이동 없이 현재 화면 위에서 즉각적으로 피드백을 남길 수 있도록 모달(Modal) 형태로 구현했습니다.

**2. 주요 기능 (Features)**

*   **문의 유형 카테고리화 (Select Dropdown):** 단순히 텍스트만 받는 것이 아니라, '팀 추가 요청', '국가 추가 요청', '기능 추가 요청', '기타 문의' 등으로 문의 유형을 규격화했습니다. 이는 향후 관리자(Admin)가 유저들의 피드백 데이터를 목적에 맞게 쉽게 필터링하고 효율적으로 대응할 수 있도록 돕습니다.
*   **직관적인 폼 입력 및 유효성 검사:** 상세 내용을 입력할 수 있는 텍스트 에어리어(Textarea)를 제공하며, 내용이 비어있을 경우 제출을 막는 프론트엔드 유효성 검사(Validation)를 적용했습니다.

**3. 기술적 작동 원리 (Tech & Logic)**

*   **프론트엔드 상태 제어 (React Controlled Components):** `useState` 훅을 활용하여 드롭다운의 선택값(Category)과 텍스트 입력값(Content)을 실시간 상태(State)로 동기화하여 관리합니다.
*   **인증 기반 API 통신 (JWT & Axios):** '문의 접수하기' 버튼 클릭 시, 프론트엔드에 저장된 JWT Access Token을 HTTP 헤더에 담아 백엔드(NestJS)의 `POST /inquiries` API로 전송합니다.
*   **백엔드 토큰 해독 및 DB 적재:** 백엔드에서는 `JwtAuthGuard`를 통해 토큰을 해독하고 "어떤 유저(User ID)가 남긴 문의인지"를 식별하여 DB(데이터베이스)에 안전하게 적재합니다.

#### 6-1. 나만의 티어리스트 작성
<img width="462" height="791" alt="image" src="https://github.com/user-attachments/assets/d3cbedb5-3309-4eac-a4d7-71b6f0d3c61a" />
<img width="476" height="885" alt="image" src="https://github.com/user-attachments/assets/3019c172-f1b5-4df8-9711-44f0bef55256" />

**1. 화면 개요**

유저가 직접 유럽 축구 클럽들을 S등급부터 D등급까지 평가하고 분류할 수 있는 인터랙티브 위젯입니다. 하단의 '대기 팀' 풀에서 상단의 티어 보드로 로고를 자유롭게 배치하며 자신만의 축구 철학을 시각화할 수 있습니다.

**2. 주요 기능 및 UI/UX (Features & UX)**

*   **순수 HTML5 Drag & Drop 구현:** 무거운 외부 라이브러리(dnd-kit 등)에 의존하지 않고, 웹 표준 `Drag & Drop API`를 활용하여 가볍고 최적화된 드래그 액션을 직접 구현했습니다.
*   **UX 개선 (자동 스크롤 보정):** 팀 로고를 드래그한 상태로 화면 최상단(S티어)으로 이동할 때, 마우스 위치를 계산하여 브라우저 화면이 부드럽게 자동 스크롤되도록 `onDrag` 이벤트를 커스텀하여 사용자 불편을 해소했습니다.
*   **직관적인 상태 분류:** 배치가 완료된 팀과 아직 배치되지 않은 '대기 팀'의 상태(State)를 분리하여, 사용자가 남은 팀을 한눈에 파악할 수 있도록 렌더링합니다.

**3. 핵심 기술: 데이터 영속성 보장 (Data Persistence)**

*   **DB 연동 및 덮어쓰기 로직:** 우측 상단의 '저장하기' 버튼을 클릭하면, 프론트엔드의 현재 티어 상태(S~D 배치 현황)가 JSON 형태로 가공되어 백엔드(NestJS) API로 전송됩니다. 백엔드에서는 해당 유저의 기존 데이터 유무를 파악해 Insert 또는 Update(덮어쓰기) 처리를 수행하여 DB에 안전하게 적재합니다.
*   **상태 유지 (Stateless Auth & DB Mapping):** 클라이언트(브라우저)에만 휘발성으로 남는 데이터가 아닙니다. JWT 토큰을 기반으로 유저를 식별하여 DB에 저장하므로, 유저가 사이트를 종료하거나 로그아웃한 뒤 다른 기기에서 재로그인하더라도 이전에 저장해둔 티어 리스트가 완벽하게 복구되어 렌더링됩니다. 사용자 경험(UX)의 단절을 막고 데이터의 영속성(Persistence)을 보장하는 아키텍처입니다.

### 7. 가상 매치업 시뮬레이터 (Virtual Matchup Simulator)
<img width="1899" height="909" alt="image" src="https://github.com/user-attachments/assets/4ed789f3-225d-47ee-8081-34242d23acc8" />
<img width="1901" height="908" alt="image" src="https://github.com/user-attachments/assets/d95dbe0c-d47e-457c-bd75-63b2d11c9712" />
<img width="300" height="238" alt="image" src="https://github.com/user-attachments/assets/87377452-4a6c-495a-9a14-64b208f0cba2" />
<img width="226" height="738" alt="image" src="https://github.com/user-attachments/assets/98d6f055-a31f-4a0a-8e0a-39d0892aff98" />

**1. 화면 개요**

사용자가 '클럽' 또는 '국가대표' 카테고리를 선택한 뒤, 대결을 펼칠 두 팀(Team A vs Team B)을 고르면 대형 언어 모델(LLM)이 양 팀의 전술적 상성, 예상 스코어, 핵심 플레이어 맞대결 등을 시뮬레이션하여 리포트 형태로 제공하는 인터랙티브 위젯입니다.

**2. 주요 기능 및 UI/UX (Features & UX)**

*   **단계별 모달 인터페이스 (Multi-step Modal UI):** 메인 화면을 벗어나지 않는 모달(Modal) 창 위에서 '카테고리 선택(클럽/국대) ➔ 팀 A 선택 ➔ 팀 B 선택 ➔ 결과 확인'으로 이어지는 매끄러운 플로우를 구현했습니다.
*   **직관적인 팀 선택 그리드:** 사용자가 직관적으로 팀을 고를 수 있도록 자체 구축한 팀 마스터 데이터를 활용하여 로고와 팀명을 깔끔한 그리드 형태로 렌더링했습니다.
*   **동적 버튼 및 로딩 상태 처리:** 두 팀이 모두 선택되기 전에는 '시뮬레이션 시작' 버튼을 비활성화(Disabled) 처리하여 오류를 방지하고, API 통신 중에는 '로딩 중...' 상태로 전환하여 사용자의 이탈을 막는 방어적 UX를 적용했습니다.

**3. 기술적 작동 원리 (Tech & Logic)**

*   **프론트엔드 상태 관리의 집약 (React State):**
    *   `category` (클럽/국가대표), `teamA`, `teamB`, `isLoading`, `reportData` 등 여러 개의 상태(State)를 유기적으로 관리합니다.
    *   카테고리 탭('클럽 매치업', '국가대표 매치업')을 전환할 때마다 선택된 팀 데이터를 초기화하고 렌더링할 팀 목록을 변경하는 등 꼼꼼한 예외 처리가 들어갔습니다.
*   **동적 프롬프트 엔지니어링 (Dynamic Prompting):**
    *   사용자가 선택한 두 팀의 이름(예: Manchester City vs Manchester United)을 백엔드(NestJS)로 전송하면, 서버는 이를 기반으로 "A팀과 B팀이 맞붙을 경우의 전술적 상성과 결과를 분석해달라"는 동적 시스템 프롬프트를 생성하여 LLM에 질의합니다.
*   **구조화된 AI 리포트 렌더링:**
    *   전술 리포트와 마찬가지로, AI의 응답을 통짜 텍스트가 아닌 JSON 포맷으로 강제(Structured Output)한 뒤 프론트엔드에서 섹션별 컴포넌트로 예쁘게 매핑하여 가독성 높은 결과 창을 띄웁니다.

### 8. 개인정보처리방침 / 이용약관 (Privacy Policy & Terms of Service)
<img width="299" height="647" alt="image" src="https://github.com/user-attachments/assets/0af780b6-d498-4718-a037-aab47dbadd24" />
<img width="307" height="550" alt="image" src="https://github.com/user-attachments/assets/0caa9efc-cde1-49cc-bc67-0e23c274c7d9" />

**1. 화면 개요**

Goalytics가 실제 유저에게 서비스된다는 가정 하에, 프로덕트의 신뢰도와 완성도를 높이기 위해 구축한 웹 규정 페이지입니다. 단순히 텍스트만 채워 넣은 것이 아니라, 실제 법적 가이드라인과 프로젝트의 성격에 맞게 내용을 직접 기획하고 구조화했습니다.

**2. 세부 구현 및 작성 기준**

*   **개인정보처리방침 (Privacy Policy): 컴플라이언스(Compliance) 준수**
    *   국내 '개인정보보호법' 가이드라인 및 필수 고지 기준을 철저히 준수하여 작성했습니다.
    *   사용자의 회원가입 시 수집되는 개인정보 항목(이메일, 닉네임, 비밀번호 등), 처리 목적, 보유 및 파기 절차, 제3자 제공 여부 등을 명확하게 카테고리화하여 명시했습니다. 이는 사용자 데이터를 안전하고 투명하게 관리하려는 개발자의 책임감을 보여줍니다.
*   **이용약관 (Terms of Service): 프로젝트 정체성 명시**
    *   제1조(서비스의 목적 및 성격)에 해당 웹사이트가 상업적 목적이 아닌 '개발자의 기술적 역량을 보여주기 위한 개인 포트폴리오용' 프로젝트임을 최상단에 명시했습니다.
    *   서비스 내에서 활용된 외부 API(Gemini, API-Football 등)의 출처를 투명하게 밝히고, 저작권 및 면책 조항을 꼼꼼히 기재하여 혹시 모를 운영상의 오해나 법적 이슈를 사전에 방지하도록 설계했습니다.
