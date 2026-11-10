import { Controller, Post, Get, Patch, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { InquiriesService } from './inquiries.service.js';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

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

  @Post()
  createInquiry(@Headers('authorization') authHeader: string, @Body() body: { title: string, content: string }) {
    const payload = this.extractTokenPayload(authHeader);
    return this.inquiriesService.createInquiry(payload.sub, body.title, body.content);
  }

  @Get()
  getAllInquiries(@Headers('authorization') authHeader: string) {
    const payload = this.extractTokenPayload(authHeader);
    
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
    return this.inquiriesService.getAllInquiries();
  }

  @Patch(':id/status')
  updateStatus(
    @Headers('authorization') authHeader: string, 
    @Param('id') id: number, 
    @Body('status') status: string
  ) {
    const payload = this.extractTokenPayload(authHeader);
    
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
    return this.inquiriesService.updateStatus(id, status);
  }
}