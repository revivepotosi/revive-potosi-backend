import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { AtraccionTuristicaService } from './atraccion-turistica.service';
import { CreateAtraccionTuristicaDto } from './dto/create-atraccion-turistica.dto';
import { UpdateAtraccionTuristicaDto } from './dto/update-atraccion-turistica.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('atraccion-turistica')
export class AtraccionTuristicaController {
    constructor(
        private readonly atraccionTuristicaService: AtraccionTuristicaService,
    ) {}

    @Post()
    create(@Body() createAtraccionTuristicaDto: CreateAtraccionTuristicaDto) {
        return this.atraccionTuristicaService.create(
            createAtraccionTuristicaDto,
        );
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.atraccionTuristicaService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseMongoIdPipe) id: string) {
        return this.atraccionTuristicaService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseMongoIdPipe) id: string,
        @Body() updateAtraccionTuristicaDto: UpdateAtraccionTuristicaDto,
    ) {
        return this.atraccionTuristicaService.update(
            id,
            updateAtraccionTuristicaDto,
        );
    }

    @Delete(':id')
    remove(@Param('id', ParseMongoIdPipe) id: string) {
        return this.atraccionTuristicaService.remove(id);
    }
}
