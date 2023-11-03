import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { TranslationDto } from 'src/common/dto/translation.dto';

export class CreateDayDto {
  @ValidateNested()
  @Type(() => TranslationDto)
  name: TranslationDto;

  @IsNumber()
  position: number;
}
