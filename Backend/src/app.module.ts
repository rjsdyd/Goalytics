import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm'; // 추가됨
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { FootballModule } from './football/football.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    // TypeORM 비동기 설정 추가
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb', // 또는 'mysql'
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true, // 엔티티 자동 로드
        synchronize: true, // 개발 환경에서만 true: 엔티티 기반으로 테이블 자동 생성
      }),
    }),
    FootballModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}