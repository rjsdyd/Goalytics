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

  async createInquiry(userId: number, title: string, content: string) {
    const newInquiry = this.inquiryRepository.create({
      user_id: userId,
      title,
      content,
    });
    await this.inquiryRepository.save(newInquiry);
    return { message: '문의가 성공적으로 접수되었습니다.' };
  }

  async getAllInquiries() {
    return this.inquiryRepository.find({ 
      order: { created_at: 'DESC' } 
    });
  }

  async updateStatus(id: number, status: string) {
    await this.inquiryRepository.update(id, { status });
    return { message: '문의 상태가 성공적으로 업데이트되었습니다.' };
  }
}