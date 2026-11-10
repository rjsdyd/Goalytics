import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('v2_teams')
export class Team {
  @PrimaryColumn()
  id: string;

  @Column()
  leagueId: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  founded: number;

  @Column()
  stadium: string;

  @Column({ nullable: true })
  stadiumImage: string; 

  @Column()
  manager: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json', nullable: true })
  topScorers: any;

  @Column({ type: 'json', nullable: true })
  topAssists: any;
}