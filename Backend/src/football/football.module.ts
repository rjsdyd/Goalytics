import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM 추가
import { FootballService } from './football.service.js';
import { FootballController } from './football.controller.js';
import { League } from './entities/league.entity.js'; // 방금 만든 엔티티 가져오기 (.js 필수)

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([League]), // 이 모듈에서 League 테이블을 쓰겠다고 선언
  ],
  controllers: [FootballController],
  providers: [FootballService],
})
export class FootballModule {}