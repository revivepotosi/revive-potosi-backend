import { PartialType } from '@nestjs/mapped-types';
import { CreateAtraccionTuristicaTypeDto } from './create-atraccion-turistica-type.dto';

export class UpdateAtraccionTuristicaTypeDto extends PartialType(
  CreateAtraccionTuristicaTypeDto,
) {}
