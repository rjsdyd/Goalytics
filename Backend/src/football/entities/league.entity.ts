import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('league')
export class League {
  // PrimaryGeneratedColumn(자동증가) 대신 PrimaryColumn을 사용합니다.
  @PrimaryColumn() 
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;
}