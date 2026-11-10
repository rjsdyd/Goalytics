import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, default: '' })
  password: string;

  @Column()
  password_hash: string;

  @Column({ length: 50 })
  nickname: string;

  @Column({ type: 'varchar', length: 20, default: 'user' })
  role: string;

  @CreateDateColumn()
  created_at: Date;
}