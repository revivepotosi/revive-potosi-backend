import { Type } from 'class-transformer';
import {
    IsString,
    IsNumber,
    IsOptional,
    IsArray,
    IsMongoId,
    IsPositive,
    ValidateNested,
} from 'class-validator';
import { TranslationDto } from 'src/common/dto/translation.dto';

export class CreateContentDto {
    @IsMongoId()
    atraccionTuristica: string;

    @IsMongoId()
    type: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => TranslationDto)
    text?: TranslationDto;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    video?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @IsNumber()
    @IsPositive()
    position: number;
}
