import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  MaxLength,
  IsArray,
  IsMongoId,
  ArrayMinSize,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/.*[A-Z].*/, {
    message: 'The password must contain at least one uppercase letter.',
  })
  password: string;

  @ArrayMinSize(1)
  @IsArray()
  @IsMongoId({ each: true })
  roles: string[];
}
