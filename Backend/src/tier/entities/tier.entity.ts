import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';

// 한 유저가 같은 카테고리(club, nation)에 대해 여러 개의 티어를 갖지 못하도록 중복 방지
@Entity('user_tiers')
@Unique(['user', 'category']) 
export class Tier {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 20 })
  category: string;

  @Column({ type: 'json' })
  tier_data: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}