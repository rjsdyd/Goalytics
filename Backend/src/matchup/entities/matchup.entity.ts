import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('matchup_simulations')
export class MatchupSimulation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column({ unique: true })
  matchup_key: string;

  @Column('text')
  simulation_result: string;

  @CreateDateColumn()
  created_at: Date;
}