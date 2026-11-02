import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  // 💡 타입 에러 방지 및 DB 호환을 위한 password 필드 추가
  @Column({ nullable: true, default: '' })
  password: string;

  @Column()
  password_hash: string; // bcrypt 암호화된 비밀번호

  @Column({ length: 50 })
  nickname: string;

  @CreateDateColumn()
  created_at: Date;
}