import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContentTypeDto {
  @IsNotEmpty()
  @IsString()
  type: string;
}
