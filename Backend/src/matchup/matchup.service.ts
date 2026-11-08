// src/matchup/matchup.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MatchupSimulation } from './entities/matchup.entity.js';

@Injectable()
export class MatchupService {
  private genAI: GoogleGenerativeAI;

  constructor(
    private configService: ConfigService,
    @InjectRepository(MatchupSimulation)
    private matchupRepo: Repository<MatchupSimulation>,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY') || '';
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async getSimulation(teamA: string, teamB: string, category: string) {
    if (!teamA || !teamB || !category) {
      throw new BadRequestException('필수 파라미터가 누락되었습니다.');
    }
    if (teamA === teamB) {
      throw new BadRequestException('동일한 팀은 대결할 수 없습니다.');
    }

    // 💡 1. 핵심 캐싱 로직: A vs B와 B vs A를 동일하게 취급하기 위해 알파벳/가나다순 정렬
    const sortedTeams = [teamA, teamB].sort();
    const matchupKey = `${category}_${sortedTeams[0]}_${sortedTeams[1]}`.replace(/\s+/g, '');

    // 2. DB 캐시 확인
    const existingMatchup = await this.matchupRepo.findOne({
      where: { matchup_key: matchupKey },
    });

    if (existingMatchup) {
      console.log(`[Matchup Cache Hit] ${matchupKey}`);
      return { result: existingMatchup.simulation_result };
    }

    console.log(`[Matchup Cache Miss] ${matchupKey} - Gemini API 호출`);

    // 3. 캐시 미스 시 AI 호출
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

      const typeLabel = category === 'nation' ? '국가대표팀' : '프로 축구 클럽';
      const prompt = `
        당신은 세계 최고의 축구 전술 분석관이자 해설가입니다.
        다음 두 ${typeLabel} 간의 가상 매치업 시뮬레이션 결과를 브리핑해주세요.

        [팀 A]: ${teamA}
        [팀 B]: ${teamB}

        다음 항목을 포함하여 마크다운으로 가독성 좋게 작성해주세요:
        ### ⚔️ 전술적 상성 및 키 플레이어 대결
        (양 팀의 전술적 상성과 승부를 가를 핵심 요인)
        ### 🛡️ 예상 경기 양상
        (경기의 주도권과 흐름 예측)
        ### 🎯 AI 예측 결과
        (예상 스코어와 최종 승리 팀 예측, 구체적이고 단호하게 작성)
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // 4. 성공 시 DB 저장
      const newMatchup = this.matchupRepo.create({
        category,
        matchup_key: matchupKey,
        simulation_result: text,
      });
      await this.matchupRepo.save(newMatchup);

      return { result: text };
    } catch (error: any) {
      console.error('Matchup Gemini API 에러:', error);
      
      if (error?.status === 429 || error?.message?.includes('429')) {
        return { result: '현재 시뮬레이션 요청이 폭주하고 있습니다. 잠시 후 다시 시도해 주세요.' };
      }
      if (error?.status === 503 || error?.message?.includes('high demand')) {
        return { result: '현재 구글 AI 서버 과부하로 시뮬레이션이 지연되고 있습니다.' };
      }
      return { result: '시뮬레이터 가동 중 문제가 발생했습니다. 관리자에게 문의해 주세요.' };
    }
  }
}