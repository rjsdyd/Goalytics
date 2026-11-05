// src/ai/entities/ai-briefing.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('ai_briefings')
export class AiBriefing {
  @PrimaryGeneratedColumn()
  id: number;

  // 팀 또는 국가 이름을 고유 키로 사용
  @Column({ unique: true })
  team_name: string;

  // 마크다운 형태의 긴 텍스트를 저장해야 하므로 'text' 타입 지정
  @Column('text')
  briefing_text: string;

  @CreateDateColumn()
  created_at: Date;
}