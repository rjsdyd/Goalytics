import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiBriefing } from './entities/ai-briefing.entity.js';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly genAI: GoogleGenerativeAI;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(AiBriefing)
    private readonly aiBriefingRepo: Repository<AiBriefing>,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    
    // 보안/안정성: API 키 누락 시 앱 구동을 중단시켜 Fail-Fast 적용
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async getTacticalBriefing(teamName: string) {
    // 온디맨드 캐싱: DB에 기존 분석 결과가 있으면 API 호출 없이 즉시 반환
    const existingBriefing = await this.aiBriefingRepo.findOne({
      where: { team_name: teamName },
    });

    if (existingBriefing) {
      return { briefing: existingBriefing.briefing_text };
    }
    
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

      const prompt = `
        당신은 세계 최고의 축구 전술 분석관입니다.
        다음 팀(또는 국가대표)의 최근 전술적 특징과 강점, 그리고 상대팀 입장에서 이 팀을 공략하기 위한 약점(공략법)을 핵심만 요약해서 브리핑해주세요.
        마크다운 형식으로 가독성 있게 작성하되, 전문적인 축구 용어를 사용하여 3~4문단 정도로 간결하게 답변해주세요.
        분석할 팀/국가: ${teamName}
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const newBriefing = this.aiBriefingRepo.create({
        team_name: teamName,
        briefing_text: text,
      });
      await this.aiBriefingRepo.save(newBriefing);

      return { briefing: text };
    } catch (error: any) {
      this.logger.error(`Gemini API 호출 에러 (${teamName}):`, error.message);
      
      // 보안: 외부로 민감한 에러 스택을 노출하지 않고 정제된 메시지만 반환
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