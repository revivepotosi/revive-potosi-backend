import { IsMongoId, IsOptional } from 'class-validator';

export class FindAllParamsDto {
    @IsOptional()
    @IsMongoId()
    atraccionTuristicaID?: string;
}
