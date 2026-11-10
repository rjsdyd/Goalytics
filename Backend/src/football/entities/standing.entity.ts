import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('standings')
@Unique(['team_id', 'season'])
export class Standing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  team_id: number;

  @Column({ type: 'int' })
  league_id: number;

  @Column({ type: 'int' })
  season: number;

  @Column({ type: 'int' })
  rank: number;

  @Column({ type: 'varchar' })
  team_name: string;

  @Column({ type: 'int' })
  points: number;

  @Column({ type: 'varchar', nullable: true })
  form: string;
}