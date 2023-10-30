import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TranslationDto } from 'src/common/dto/translation.dto';

class PeriodDto {
  @IsString()
  @MinLength(1)
  startTime: string;

  @IsString()
  @MinLength(1)
  endTime: string;
}

class ScheduleDto {
  @IsMongoId()
  @MinLength(1)
  day: string;

  @ArrayMinSize(1)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PeriodDto)
  periods: PeriodDto[];
}

export class CreateAtraccionTuristicaDto {
  @ValidateNested()
  @Type(() => TranslationDto)
  name: TranslationDto;

  @ArrayMinSize(1)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  schedule: ScheduleDto[];

  @IsString()
  @MinLength(1)
  address: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
