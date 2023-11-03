import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AtraccionTuristicaTypeService } from './atraccion-turistica-type.service';
import { CreateAtraccionTuristicaTypeDto } from './dto/create-atraccion-turistica-type.dto';
import { UpdateAtraccionTuristicaTypeDto } from './dto/update-atraccion-turistica-type.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('atraccion-turistica-type')
export class AtraccionTuristicaTypeController {
  constructor(
    private readonly atraccionTuristicaTypeService: AtraccionTuristicaTypeService,
  ) {}

  @Post()
  create(
    @Body() createAtraccionTuristicaTypeDto: CreateAtraccionTuristicaTypeDto,
  ) {
    return this.atraccionTuristicaTypeService.create(
      createAtraccionTuristicaTypeDto,
    );
  }

  @Get()
  findAll() {
    return this.atraccionTuristicaTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.atraccionTuristicaTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateAtraccionTuristicaTypeDto: UpdateAtraccionTuristicaTypeDto,
  ) {
    return this.atraccionTuristicaTypeService.update(
      id,
      updateAtraccionTuristicaTypeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.atraccionTuristicaTypeService.remove(id);
  }
}
