import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FootballModule } from './football/football.module.js';
import { AuthModule } from './auth/auth.module.js'; // ✅ 추가 (.js 확장자 필수)
import { TeamsModule } from './teams/teams.module.js';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}