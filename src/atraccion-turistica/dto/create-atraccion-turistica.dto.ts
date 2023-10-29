import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TranslationDto } from 'src/common/dto/translation.dto';

class PeriodoDto {
  @IsString()
  @MinLength(1)
  hora_inicio: string;

  @IsString()
  @MinLength(1)
  hora_fin: string;
}

class HorarioDto {
  @IsMongoId()
  @MinLength(1)
  dia: string;

  @ArrayMinSize(1)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PeriodoDto)
  periodos: PeriodoDto[];
}

export class CreateAtraccionTuristicaDto {
  @ValidateNested()
  @Type(() => TranslationDto)
  name: TranslationDto;

  @ArrayMinSize(1)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioDto)
  horario: HorarioDto[];
}
