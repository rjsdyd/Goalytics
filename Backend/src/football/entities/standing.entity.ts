import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('standings')
// 💡 TypeORM의 upsert 기능이 작동하려면 복합 키(team_id + season)에 유니크 제약이 있어야 합니다.
@Unique(['team_id', 'season'])
export class Standing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  team_id: number;

  // 💡 새롭게 추가된 리그 ID 컬럼! (이 컬럼 덕분에 5대 리그 필터링이 가능해집니다)
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

  // 시즌 극초반에는 form(최근 전적) 데이터가 없을 수 있으므로 nullable 처리
  @Column({ type: 'varchar', nullable: true })
  form: string;
}