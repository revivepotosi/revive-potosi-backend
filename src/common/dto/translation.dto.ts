import { IsString, MinLength } from 'class-validator';

export class TranslationDto {
  @IsString()
  @MinLength(1)
  ES: string;

  @IsString()
  @MinLength(1)
  EN: string;
}
