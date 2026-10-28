import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('standings')
export class Standing {
  @PrimaryColumn()
  team_id: number; // 팀 고유 ID

  @PrimaryColumn()
  season: number; // 복합키: 시즌 연도 (예: 2021, 2022...)

  @Column()
  rank: number;

  @Column()
  team_name: string;

  @Column()
  points: number;

  @Column({ nullable: true })
  form: string;

  @UpdateDateColumn()
  updated_at: Date;
}