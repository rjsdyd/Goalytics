import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
// 주의: 방금 전 해결하셨던 것처럼 .js 확장자가 필요하다면 './football/football.module.js' 로 유지해주세요.
import { FootballModule } from './football/football.module.js'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3310,
      username: 'root',      
      password: '1234',      
      database: 'goalytics',
      // 👇 에러가 나던 __dirname 코드를 지우고 아래 한 줄로 교체합니다.
      autoLoadEntities: true, 
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    FootballModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}