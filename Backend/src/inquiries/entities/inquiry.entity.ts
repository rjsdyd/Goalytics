// src/inquiries/entities/inquiry.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('inquiries')
export class Inquiry {
  @PrimaryGeneratedColumn()
  id: number;

  // 💡 문의를 작성한 유저의 ID
  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  // 💡 답변 상태 (기본값: 'WAITING', 처리 완료 시 'COMPLETED' 등으로 업데이트)
  @Column({ type: 'varchar', length: 20, default: 'WAITING' })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}