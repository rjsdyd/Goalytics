import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('v2_leagues')
export class League {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  emblem: string;
}