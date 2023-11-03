import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAtraccionTuristicaTypeDto {
  @IsNotEmpty()
  @IsString()
  type: string;
}
