import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity.js';
import { League } from './entities/league.entity.js';
import { TeamsService } from './teams.service.js';
import { TeamsController } from './teams.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Team, League])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}