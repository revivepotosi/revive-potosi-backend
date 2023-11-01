import { IsString, IsEmail, IsOptional } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
