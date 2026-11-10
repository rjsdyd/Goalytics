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
  private fixtureCache: Map<string, { data: any[]; timestamp: number }> = new Map();

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(League) private leagueRepository: Repository<League>,
    @InjectRepository(Fixture) private fixtureRepository: Repository<Fixture>,
    @InjectRepository(Standing) private standingRepository: Repository<Standing>,
  ) {}

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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

  async getFixturesByDate(date?: string) {
    const targetDate = date || new Date().toLocaleDateString('en-CA');
    const now = Date.now();

    if (this.fixtureCache.has(targetDate)) {
      const cached = this.fixtureCache.get(targetDate)!;
      if (now - cached.timestamp < 24 * 60 * 60 * 1000) {
        this.logger.log(`[캐시 Hit] ${targetDate} 경기 데이터를 메모리에서 불러옵니다. (API 호출 0회)`);
        return cached.data;
      }
    }

    const majorLeagueIds = [39, 140, 135, 78, 61, 2, 3, 292]; 
    let currentDate = targetDate;
    let filteredMatches: any[] = [];

    try {
      for (let i = 0; i < 3; i++) {
        const response = await firstValueFrom(
          this.httpService.get('https://v3.football.api-sports.io/fixtures', {
            headers: {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
            },
            params: { date: currentDate },
          }),
        );

        const allMatches = response.data.response || [];
        filteredMatches = allMatches.filter((item: any) =>
          item.league && majorLeagueIds.includes(item.league.id)
        );

        if (filteredMatches.length > 0) {
          this.logger.log(`[최신 경기 로드 성공] 기준 날짜: ${currentDate} (총 ${filteredMatches.length}개 경기)`);
          break;
        }

        const prevDate = new Date(currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        currentDate = prevDate.toLocaleDateString('en-CA');
      }

      const result = filteredMatches.slice(0, 10).map((item: any) => {
        const statusCode = item.fixture.status.short;
        let matchStatus: 'LIVE' | 'FT' | 'SCHEDULED' = 'SCHEDULED';

        if (['FT', 'AET', 'PEN'].includes(statusCode)) {
          matchStatus = 'FT';
        } else if (['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE'].includes(statusCode)) {
          matchStatus = 'LIVE';
        }

        let matchTime = '';
        if (matchStatus === 'LIVE') {
          matchTime = item.fixture.status.elapsed ? `${item.fixture.status.elapsed}'` : 'LIVE';
        } else {
          matchTime = new Date(item.fixture.date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
        }

        const homeGoal = item.goals.home;
        const awayGoal = item.goals.away;
        const scoreStr =
          homeGoal !== null && awayGoal !== null
            ? `${homeGoal} - ${awayGoal}`
            : '- vs -';

        return {
          id: item.fixture.id,
          league: item.league.name,
          homeTeam: { name: item.teams.home.name, logo: item.teams.home.logo },
          awayTeam: { name: item.teams.away.name, logo: item.teams.away.logo },
          score: scoreStr,
          status: matchStatus,
          time: matchStatus === 'FT' ? '종료' : matchTime,
        };
      });

      this.fixtureCache.set(targetDate, { data: result, timestamp: now });
      return result;

    } catch (error: any) {
      this.logger.error('최신 경기 데이터 조회 중 오류 발생:', error.message);
      return [];
    }
  }

  async fetchAndSaveStandings() {
    const targetSeasons = [2022, 2023, 2024]; 
    const targetLeagues = [39, 140, 135, 78, 61]; 
    
    try {
      for (const season of targetSeasons) {
        for (const leagueId of targetLeagues) {
          
          this.logger.log(`[순위 동기화] ${leagueId} 리그 ${season} 시즌 데이터 요청 중... (API 제한 방지를 위해 7초 대기)`);
          
          await this.delay(7000); 

          const response = await firstValueFrom(
            this.httpService.get('https://v3.football.api-sports.io/standings', {
              headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
              },
              params: { league: leagueId, season: season }, 
            }),
          );

          const responseData = response.data.response;
          if (!responseData || responseData.length === 0) {
            this.logger.warn(`${leagueId} 리그 ${season} 시즌 데이터가 없습니다.`);
            continue;
          }

          const standingsData = responseData[0].league.standings[0];

          for (const item of standingsData) {
            await this.standingRepository.upsert(
              {
                team_id: item.team.id,
                league_id: leagueId, 
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
      }
      this.logger.log('5대 리그 순위 데이터 동기화 완료');
      return { message: '5대 리그 순위 데이터 동기화 완료' };
    } catch (error: any) {
      this.logger.error('순위 데이터 동기화 오류:', error.message);
      throw error;
    }
  }

  async getLatestStandings() {
    return await this.standingRepository.find({
      where: { season: 2024, league_id: 39 }, 
      order: { rank: 'ASC' },
      take: 6,
    });
  }

  async getHistoryStandings(season: number, leagueId: number) {
    return await this.standingRepository.find({
      where: { season: season, league_id: leagueId }, 
      order: { rank: 'ASC' },
    });
  }

  async getLatestNews() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://newsapi.org/v2/everything', {
          params: {
            q: '"축구" OR "프리미어리그" OR "손흥민" OR "챔피언스리그" OR "이강인" OR "김민재"',
            language: 'ko',
            sortBy: 'publishedAt',
            pageSize: 20,
            apiKey: process.env.NEWS_API_KEY,
          },
        }),
      );

      const articles = response.data.articles || [];
      const footballKeywords = ['축구', '리그', '손흥민', '이강인', '김민재', '감독', '골', 'FC', '매치', '월드컵', 'K리그', '토트넘', '바르셀로나', '레알', '맨시티'];
      
      const filteredArticles = articles.filter((article: any) => {
        const text = (article.title + ' ' + (article.description || '')).toLowerCase();
        return footballKeywords.some(keyword => text.includes(keyword.toLowerCase()));
      });

      return filteredArticles.slice(0, 4).map((article: any, index: number) => {
        let tag = 'News';
        let tagColor = 'bg-blue-100 text-blue-600';
        
        if (article.title.includes('이적') || article.title.includes('영입') || article.title.includes('계약')) {
          tag = 'Transfer';
          tagColor = 'bg-purple-100 text-purple-600';
        } else if (article.title.includes('골') || article.title.includes('승리') || article.title.includes('매치')) {
          tag = 'Match';
          tagColor = 'bg-green-100 text-green-600';
        } else if (article.title.includes('부상') || article.title.includes('결장')) {
          tag = 'Alert';
          tagColor = 'bg-red-100 text-red-600';
        }

        const pubDate = new Date(article.publishedAt);
        const timeString = `${pubDate.getMonth() + 1}월 ${pubDate.getDate()}일`;

        return {
          id: index + 1,
          tag: tag,
          tagColor: tagColor,
          title: article.title,
          summary: article.description || '본문 내용이 제공되지 않는 기사입니다.',
          source: article.source.name || '스포츠 뉴스',
          time: timeString,
          imageUrl: article.urlToImage || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=400&auto=format&fit=crop',
          url: article.url,
        };
      });
    } catch (error: any) {
      this.logger.error('뉴스 데이터 조회 실패:', error.message);
      return [];
    }
  }
}