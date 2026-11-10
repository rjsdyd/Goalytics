import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('ai_briefings')
export class AiBriefing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  team_name: string;

  @Column('text')
  briefing_text: string;

  @CreateDateColumn()
  created_at: Date;
}