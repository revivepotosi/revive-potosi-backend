import { Module } from '@nestjs/common';
import { ContentTypeService } from './content-type.service';
import { ContentTypeController } from './content-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentType, ContentTypeSchema } from './entities/content-type.entity';

@Module({
    controllers: [ContentTypeController],
    providers: [ContentTypeService],
    imports: [
        MongooseModule.forFeature([
            {
                name: ContentType.name,
                schema: ContentTypeSchema,
            },
        ]),
    ],
    exports: [MongooseModule],
})
export class ContentTypeModule {}
