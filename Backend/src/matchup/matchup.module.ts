// src/matchup/matchup.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchupController } from './matchup.controller.js';
import { MatchupService } from './matchup.service.js';
import { MatchupSimulation } from './entities/matchup.entity.js';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([MatchupSimulation]),
  ],
  controllers: [MatchupController],
  providers: [MatchupService],
})
export class MatchupModule {}