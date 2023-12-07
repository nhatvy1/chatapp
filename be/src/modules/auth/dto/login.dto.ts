import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(1, { message: ' Mật khẩu phải từ 1 ký tự trở' })
  @MaxLength(100)
  password: string;
}