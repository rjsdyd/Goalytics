// src/teams/entities/team.entity.ts

import { Entity, PrimaryColumn, Column } from 'typeorm';

// ✅ 기존 teams 테이블을 버리고 'api_teams'라는 새 테이블을 생성합니다!
@Entity('api_teams') 
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

  @Column()
  manager: string;

  @Column({ type: 'text' })
  description: string;
}