import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('v2_leagues') // ✅ 충돌 방지를 위해 v2 테이블로 새로 생성
export class League {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  emblem: string;
}