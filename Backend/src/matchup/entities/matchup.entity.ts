// src/matchup/entities/matchup.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('matchup_simulations')
export class MatchupSimulation {
  @PrimaryGeneratedColumn()
  id: number;

  // 카테고리 (league 또는 nation)
  @Column()
  category: string;

  // 💡 정렬된 조합 키 (예: 'league_ManchesterCity_RealMadrid')
  @Column({ unique: true })
  matchup_key: string;

  @Column('text')
  simulation_result: string;

  @CreateDateColumn()
  created_at: Date;
}