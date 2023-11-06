import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { DayService } from './day.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('day')
export class DayController {
    constructor(private readonly dayService: DayService) {}

    @Post()
    create(@Body() createDayDto: CreateDayDto) {
        return this.dayService.create(createDayDto);
    }

    @Get()
    findAll() {
        return this.dayService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseMongoIdPipe) id: string) {
        return this.dayService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseMongoIdPipe) id: string,
        @Body() updateDayDto: UpdateDayDto,
    ) {
        return this.dayService.update(id, updateDayDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseMongoIdPipe) id: string) {
        return this.dayService.remove(id);
    }
}
