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

  // 💡 새롭게 추가된 관리자 권한 컬럼 (기본값: 일반 유저)
  @Column({ type: 'varchar', length: 20, default: 'user' })
  role: string; // 'user' 또는 'admin'

  @CreateDateColumn()
  created_at: Date;
}