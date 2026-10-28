# ⚽ Goalytics

실시간 축구 경기 데이터와 다개년(2021~2025) 리그 순위 히스토리를 제공하는 풀스택 축구 대시보드 플랫폼입니다.

## 🛠 Tech Stack

### Frontend
* **Core**: React, TypeScript
* **Styling**: TailwindCSS
* **Routing**: React Router (`react-router-dom`)
* **Network**: Axios

### Backend
* **Framework**: NestJS (TypeScript)
* **Database & ORM**: MariaDB, TypeORM
* **Integration**: API-Football, `@nestjs/schedule` (Cron)
* **Security & Config**: `@nestjs/config` (환경변수 관리)

---

## 📌 Key Features

1. **컴포넌트 기반 모듈화 아키텍처**
   * UI를 독립적인 컴포넌트(`Header`, `LiveMatch`, `Standings`, `MiniStats` 등)로 분리하여 유지보수성 및 코드 가독성 향상
   * `React Router`를 통한 대시보드와 리그 페이지 간 SPA 라우팅 구현

2. **다개년 시계열 순위 데이터베이스 설계**
   * 팀 ID(`team_id`)와 시즌 연도(`season`)를 결합한 **복합키(Composite Primary Key)** 구조의 `Standing` 엔티티 설계
   * 'View Full Table' 모달 및 연도별 탭 시스템을 통해 2021~2025 시즌별 순위 히스토리 탐색 기능 제공

3. **엔터프라이즈급 보안 및 설정 관리**
   * `@nestjs/config`를 활용해 DB 접속 정보 및 외부 API Key를 소스 코드에서 완전히 분리하고 `.env` 기반 안전한 환경변수 주입 적용
