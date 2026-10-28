import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { FootballController } from './football.controller.js';
import { FootballService } from './football.service.js';
import { League } from './entities/league.entity.js';
import { Fixture } from './entities/fixture.entity.js';
import { Standing } from './entities/standing.entity.js'; // 추가

@Module({
  // TypeOrmModule.forFeature 배열에 Standing을 추가합니다.
  imports: [
    TypeOrmModule.forFeature([League, Fixture, Standing]),
    HttpModule,
  ],
  controllers: [FootballController],
  providers: [FootballService],
})
export class FootballModule {}