import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: '유효한 이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일은 필수 입력값입니다.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수 입력값입니다.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '닉네임은 필수 입력값입니다.' })
  nickname: string;
}