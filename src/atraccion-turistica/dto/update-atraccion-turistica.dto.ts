import { PartialType } from '@nestjs/mapped-types';
import { CreateAtraccionTuristicaDto } from './create-atraccion-turistica.dto';

export class UpdateAtraccionTuristicaDto extends PartialType(
    CreateAtraccionTuristicaDto,
) {}
