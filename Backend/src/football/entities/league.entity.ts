import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('leagues')
export class League {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  logo_url: string;
}