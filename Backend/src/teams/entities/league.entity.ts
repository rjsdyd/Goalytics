// src/teams/entities/league.entity.ts

import { Entity, PrimaryColumn, Column } from 'typeorm';

// ✅ 기존 leagues 테이블을 버리고 'api_leagues'라는 새 테이블을 생성합니다!
@Entity('api_leagues') 
export class League {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  emblem: string;
}