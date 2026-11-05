import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './entities/inquiry.entity.js';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>,
  ) {}

  // 일반 유저: 새로운 문의 작성
  async createInquiry(userId: number, title: string, content: string) {
    const newInquiry = this.inquiryRepository.create({
      user_id: userId,
      title,
      content,
    });
    await this.inquiryRepository.save(newInquiry);
    return { message: '문의가 성공적으로 접수되었습니다.' };
  }

  // 관리자: 전체 문의 내역 최신순으로 조회
  async getAllInquiries() {
    return this.inquiryRepository.find({ 
      order: { created_at: 'DESC' } 
    });
  }

  // 관리자: 문의 답변 상태(WAITING -> COMPLETED) 변경
  async updateStatus(id: number, status: string) {
    await this.inquiryRepository.update(id, { status });
    return { message: '문의 상태가 성공적으로 업데이트되었습니다.' };
  }
}