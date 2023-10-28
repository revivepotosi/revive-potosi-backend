import { IsString, MinLength } from 'class-validator';

export class CreateAtraccionTuristicaDto {
  @IsString()
  @MinLength(1)
  name: string;
}
