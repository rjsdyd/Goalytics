import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string; // bcrypt로 암호화된 비밀번호 저장

  @Column({ length: 50 })
  nickname: string;

  @CreateDateColumn()
  created_at: Date;
}