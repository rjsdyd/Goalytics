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
