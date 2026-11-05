// src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiBriefing } from './entities/ai-briefing.entity.js';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(
    private configService: ConfigService,
    // 💡 저장소(Repository) 주입
    @InjectRepository(AiBriefing)
    private aiBriefingRepo: Repository<AiBriefing>,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY') || '';
    if (!apiKey) {
      console.error('GEMINI_API_KEY가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async getTacticalBriefing(teamName: string) {
    // 1. DB에 이미 분석된 데이터가 있는지 확인 (캐시 히트)
    const existingBriefing = await this.aiBriefingRepo.findOne({
      where: { team_name: teamName },
    });

    if (existingBriefing) {
      console.log(`[AI Cache Hit] ${teamName} - DB에서 바로 불러옵니다.`);
      return { briefing: existingBriefing.briefing_text };
    }

    console.log(`[AI Cache Miss] ${teamName} - Gemini API를 새로 호출합니다.`);
    
    // 2. DB에 없으면 Gemini API 호출 (캐시 미스)
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

      const prompt = `
        당신은 세계 최고의 축구 전술 분석관입니다.
        다음 팀(또는 국가대표)의 최근 전술적 특징과 강점, 그리고 상대팀 입장에서 이 팀을 공략하기 위한 약점(공략법)을 핵심만 요약해서 브리핑해주세요.
        마크다운 형식으로 가독성 있게 작성하되, 전문적인 축구 용어를 사용하여 3~4문단 정도로 간결하게 답변해주세요.
        분석할 팀/국가: ${teamName}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // 3. API에서 성공적으로 받아온 결과를 DB에 저장
      const newBriefing = this.aiBriefingRepo.create({
        team_name: teamName,
        briefing_text: text,
      });
      await this.aiBriefingRepo.save(newBriefing);

      return { briefing: text };
    } catch (error: any) {
      console.error('Gemini API 호출 에러:', error);
      
      if (error?.status === 429 || error?.message?.includes('429')) {
        return { briefing: '현재 AI 전술 분석 요청이 많아 일시적으로 지연되고 있습니다. 잠시 후 다시 시도해 주세요.' };
      }
      if (error?.status === 503 || error?.message?.includes('high demand')) {
        return { briefing: '현재 구글 AI 서버에 일시적인 트래픽 과부하가 발생했습니다. 잠시 후 다시 시도해 주세요.' };
      }
      return { briefing: 'AI 전술 분석을 불러오는 중 문제가 발생했습니다. 관리자에게 문의해 주세요.' };
    }
  }
}