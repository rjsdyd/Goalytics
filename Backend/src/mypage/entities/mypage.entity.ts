import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('favorite_teams')
export class FavoriteTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', length: 50 })
  team_id: string;

  @Column({ type: 'varchar', length: 100 })
  team_name: string;

  @Column({ type: 'text' })
  logo_url: string;
}

@Entity('favorite_nations')
export class FavoriteNation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', length: 50 })
  nation_id: string;

  @Column({ type: 'varchar', length: 100 })
  nation_name: string;

  @Column({ type: 'text' })
  logo_url: string;
}