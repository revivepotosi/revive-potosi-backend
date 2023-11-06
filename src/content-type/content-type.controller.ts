import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ContentTypeService } from './content-type.service';
import { CreateContentTypeDto } from './dto/create-content-type.dto';
import { UpdateContentTypeDto } from './dto/update-content-type.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('content-type')
export class ContentTypeController {
    constructor(private readonly contentTypeService: ContentTypeService) {}

    @Post()
    create(@Body() createContentTypeDto: CreateContentTypeDto) {
        return this.contentTypeService.create(createContentTypeDto);
    }

    @Get()
    findAll() {
        return this.contentTypeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseMongoIdPipe) id: string) {
        return this.contentTypeService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseMongoIdPipe) id: string,
        @Body() updateContentTypeDto: UpdateContentTypeDto,
    ) {
        return this.contentTypeService.update(id, updateContentTypeDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseMongoIdPipe) id: string) {
        return this.contentTypeService.remove(id);
    }
}
