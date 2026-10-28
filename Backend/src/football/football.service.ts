import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { League } from './entities/league.entity.js';
import { Fixture } from './entities/fixture.entity.js';
import { Standing } from './entities/standing.entity.js';

@Injectable()
export class FootballService {
  private readonly logger = new Logger(FootballService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(League) private leagueRepository: Repository<League>,
    @InjectRepository(Fixture) private fixtureRepository: Repository<Fixture>,
    @InjectRepository(Standing) private standingRepository: Repository<Standing>,
  ) {}

  // 1. 리그(Leagues) 로직
  async fetchAndSaveLeagues() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://v3.football.api-sports.io/leagues', {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
          },
          params: { current: 'true' },
        }),
      );
      const targetLeagues = [39, 140, 135, 78, 61]; 
      const leagues = response.data.response.filter((item: any) => targetLeagues.includes(item.league.id));

      for (const item of leagues) {
        await this.leagueRepository.upsert(
          { id: item.league.id, name: item.league.name, country: item.country.name, logo_url: item.league.logo },
          ['id'],
        );
      }
      return { message: '리그 데이터 동기화 완료' };
    } catch (error: any) {
      this.logger.error('리그 데이터 호출 중 오류 발생:', error.message);
      throw error;
    }
  }

  async getSavedLeagues() {
    return await this.leagueRepository.find();
  }

  // 2. 실시간 경기(Fixtures) 로직
  @Cron(CronExpression.EVERY_12_HOURS) 
  async fetchAndUpsertLiveFixtures() {
    this.logger.log('실시간 경기 데이터 동기화 시작...');
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await firstValueFrom(
        this.httpService.get('https://v3.football.api-sports.io/fixtures', {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
          },
          params: { league: 39, season: 2024, date: today }, 
        }),
      );
      const fixtures = response.data.response || [];

      for (const item of fixtures) {
        await this.fixtureRepository.upsert(
          {
            id: item.fixture.id, league_id: item.league.id, home_team_id: item.teams.home.id,
            away_team_id: item.teams.away.id, match_date: new Date(item.fixture.date),
            status: item.fixture.status.short, home_score: item.goals.home, away_score: item.goals.away,
          },
          ['id'],
        );
      }
      this.logger.log(`총 ${fixtures.length}개의 경기 데이터 Upsert 완료`);
    } catch (error: any) {
      this.logger.error('경기 데이터 동기화 중 오류 발생:', error.message);
    }
  }

  async getSavedFixtures() {
    return await this.fixtureRepository.find({ order: { match_date: 'ASC' } });
  }

  // 3. 순위표(Standings) 로직 - 최근 5년치 적재
  async fetchAndSaveStandings() {
    const targetSeasons = [2021, 2022, 2023, 2024, 2025]; 
    try {
      for (const season of targetSeasons) {
        const response = await firstValueFrom(
          this.httpService.get('https://v3.football.api-sports.io/standings', {
            headers: {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
            },
            params: { league: 39, season: season }, 
          }),
        );

        const responseData = response.data.response;
        if (!responseData || responseData.length === 0) continue;

        const standingsData = responseData[0].league.standings[0];

        for (const item of standingsData) {
          await this.standingRepository.upsert(
            {
              team_id: item.team.id,
              season: season,
              rank: item.rank,
              team_name: item.team.name,
              points: item.points,
              form: item.form,
            },
            ['team_id', 'season'],
          );
        }
      }
      return { message: '최근 5시즌 순위 데이터 동기화 완료' };
    } catch (error: any) {
      this.logger.error('순위 데이터 동기화 오류:', error.message);
      throw error;
    }
  }

  // 대시보드 메인용 (2024 시즌 데이터 상위 6팀)
  async getLatestStandings() {
    return await this.standingRepository.find({
      where: { season: 2024 },
      order: { rank: 'ASC' },
      take: 6,
    });
  }

  // 모달 상세조회용
  async getStandingsBySeason(season: number) {
    return await this.standingRepository.find({
      where: { season: season },
      order: { rank: 'ASC' },
    });
  }
}