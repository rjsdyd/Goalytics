import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Team } from './entities/team.entity.js';
import { League } from './entities/league.entity.js';

@Injectable()
export class TeamsService implements OnModuleInit {
  private readonly logger = new Logger(TeamsService.name);

  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
    @InjectRepository(League)
    private leaguesRepository: Repository<League>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const leagueCount = await this.leaguesRepository.count();
    
    // 데이터가 이미 있으면 API를 호출하지 않고 그대로 유지합니다.
    if (leagueCount === 0) {
      this.logger.log('DB에 리그 데이터가 없습니다. API에서 실제 데이터를 가져옵니다...');
      await this.fetchAndSaveTeams();
    } else {
      this.logger.log(`이미 ${leagueCount}개의 리그 데이터가 DB에 존재합니다. 불필요한 API 호출을 건너뜁니다.`);
    }
  }

  async fetchAndSaveTeams() {
    const apiKey = this.configService.get<string>('FOOTBALL_API_KEY');
    if (!apiKey) {
      this.logger.error('FOOTBALL_API_KEY가 .env 파일에 없습니다!');
      return;
    }

    const leagues = ['PL', 'PD', 'SA', 'BL1', 'FL1'];

    for (const leagueId of leagues) {
      try {
        this.logger.log(`${leagueId} 리그 데이터 요청 중...`);
        const response = await axios.get(`https://api.football-data.org/v4/competitions/${leagueId}/teams`, {
          headers: { 'X-Auth-Token': apiKey },
        });

        const comp = response.data.competition;
        
        await this.leaguesRepository.save({
          id: leagueId,
          name: comp.name,
          emblem: comp.emblem,
        });

        const teamsData = response.data.teams.map((apiTeam: any) => {
          return {
            id: apiTeam.tla || apiTeam.shortName?.substring(0, 3).toUpperCase() || 'UNK', 
            leagueId: leagueId,
            name: apiTeam.name,
            logo: apiTeam.crest,
            founded: apiTeam.founded || 0,
            stadium: apiTeam.venue || 'Unknown',
            manager: apiTeam.coach?.name || 'Unknown',
            description: `${apiTeam.name}은(는) ${comp.name}의 프로 축구 구단입니다.`,
          };
        });

        await this.teamsRepository.save(teamsData);
        this.logger.log(`${leagueId} 리그 및 ${teamsData.length}개 팀 저장 완료!`);
        
      } catch (error: any) {
         this.logger.error(`${leagueId} API 호출 실패:`, error.response?.data || error.message);
      } finally {
        this.logger.log(`안전한 호출을 위해 7초간 대기합니다...`);
        await new Promise(resolve => setTimeout(resolve, 7000));
      }
    }
    
    this.logger.log('🎉 모든 리그와 팀 데이터 수집이 완료되었습니다!');
  }

  async findAllLeagues(): Promise<League[]> {
    return this.leaguesRepository.find();
  }

  async findByLeague(leagueId: string): Promise<Team[]> {
    return this.teamsRepository.find({
      where: { leagueId },
      order: { name: 'ASC' },
    });
  }
}