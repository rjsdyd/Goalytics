// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FootballModule } from './football/football.module.js';
import { AuthModule } from './auth/auth.module.js'; // ✅ 추가 (.js 확장자 필수)
import { TeamsModule } from './teams/teams.module.js';
import { MyPageModule } from './mypage/mypage.module.js'; // ✅ MyPageModule 추가
import { InquiriesModule } from './inquiries/inquiries.module.js'; // 💡 문의함 모듈 추가
import { UsersModule } from './users/users.module.js'; // 💡 유저 관리 모듈 추가
import { AiModule } from './ai/ai.module.js'; // 💡 AI 전술 분석 및 매치업 모듈 추가
import { MatchupModule } from './matchup/matchup.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // 민감한 기본값(root, 1234 등)을 완전히 제거하고 .env 환경변수만 의존하도록 수정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    
    ScheduleModule.forRoot(),
    FootballModule,
    AuthModule, // ✅ 추가: AuthModule을 앱에 등록
    TeamsModule,
    MyPageModule, // ✅ MyPageModule 등록
    InquiriesModule, // 💡 추가: InquiriesModule 등록
    UsersModule, // 💡 추가: UsersModule 등록
    AiModule, // 💡 추가: AiModule 등록
    MatchupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}