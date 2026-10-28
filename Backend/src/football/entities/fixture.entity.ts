import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('fixtures')
export class Fixture {
  @PrimaryColumn()
  id: number;

  @Column()
  league_id: number;

  @Column()
  home_team_id: number;

  @Column()
  away_team_id: number;

  @Column({ type: 'timestamp' })
  match_date: Date;

  @Column()
  status: string;

  @Column({ nullable: true })
  home_score: number;

  @Column({ nullable: true })
  away_score: number;

  @UpdateDateColumn()
  updated_at: Date;
}