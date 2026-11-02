import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js'; // js 확장자 사용 환경에 맞춤

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 💡 프론트엔드(React)의 접근을 허용하는 CORS 설정
  app.enableCors({
    origin: true, // 개발 단계에서는 모든 출처 허용
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(3000);
}
bootstrap();