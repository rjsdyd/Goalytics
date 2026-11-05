import { Controller, Post, Get, Patch, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { InquiriesService } from './inquiries.service.js';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  // 💡 JWT 토큰 디코딩 및 페이로드 추출 헬퍼 함수
  private extractTokenPayload(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('로그인 토큰이 없습니다.');
    }
    const token = authHeader.split(' ')[1];
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedJson = Buffer.from(payloadBase64, 'base64').toString('utf8');
      return JSON.parse(decodedJson);
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }

  // API: 유저가 문의 작성
  @Post()
  createInquiry(@Headers('authorization') authHeader: string, @Body() body: { title: string, content: string }) {
    const payload = this.extractTokenPayload(authHeader);
    return this.inquiriesService.createInquiry(payload.sub, body.title, body.content);
  }

  // API: 관리자가 모든 문의 조회
  @Get()
  getAllInquiries(@Headers('authorization') authHeader: string) {
    const payload = this.extractTokenPayload(authHeader);
    
    // 💡 관리자가 아니면 조회 차단
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
    return this.inquiriesService.getAllInquiries();
  }

  // API: 관리자가 문의 상태 변경 (예: 답변 완료)
  @Patch(':id/status')
  updateStatus(
    @Headers('authorization') authHeader: string, 
    @Param('id') id: number, 
    @Body('status') status: string
  ) {
    const payload = this.extractTokenPayload(authHeader);
    
    // 💡 관리자가 아니면 상태 변경 차단
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
    return this.inquiriesService.updateStatus(id, status);
  }
}