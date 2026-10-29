// 백엔드 프로젝트: src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✅ 추가: 프론트엔드(5173 포트)의 API 요청 허용
  app.enableCors({
    origin: 'http://localhost:5173', // 프론트엔드 주소
    credentials: true, // 인증 토큰(Cookie, Authorization 헤더 등)을 포함한 요청 허용
  });

  await app.listen(3000);
}
bootstrap();