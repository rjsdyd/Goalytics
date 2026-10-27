import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { League } from './entities/league.entity.js'; // .js 필수

@Injectable()
export class FootballService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,
  ) {}

  // 1. 외부 데이터를 가져와서 Upsert(중복 시 업데이트) 하는 함수
  async fetchAndSaveLeagues() {
    const apiKey = this.configService.get<string>('API_FOOTBALL_KEY');
    const url = 'https://v3.football.api-sports.io/leagues';

    const response = await lastValueFrom(
      this.httpService.get(url, { headers: { 'x-apisports-key': apiKey } }),
    );

    const leagueDataList = response.data.response.slice(0, 5); // 5개만 테스트

    // DB에 넣을 형태(Entity)로 배열을 가공합니다.
    const entitiesToSave = leagueDataList.map((item: any) => {
      return this.leagueRepository.create({
        id: item.league.id, // API가 제공하는 고유 리그 ID를 그대로 사용!
        name: item.league.name,
        country: item.country.name,
      });
    });

    // 배열을 한 번에 Upsert 합니다. 기준점은 'id' 컬럼입니다.
    await this.leagueRepository.upsert(entitiesToSave, ['id']);

    return {
      message: 'DB에 축구 리그 데이터를 안전하게 업서트(Upsert) 했습니다!',
      count: entitiesToSave.length,
    };
  }

  // 2. DB에 저장된 데이터를 조회하는 함수
  async getSavedLeagues() {
    // find()는 테이블의 모든 데이터를 배열로 가져옵니다.
    return await this.leagueRepository.find();
  }
}