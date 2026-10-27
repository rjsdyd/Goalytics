import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js'; // .js 유지

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 프론트엔드에서의 API 접근을 허용합니다.
  app.enableCors(); 
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();