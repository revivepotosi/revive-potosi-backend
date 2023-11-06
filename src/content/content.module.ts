import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './entities/content.entity';

@Module({
    controllers: [ContentController],
    providers: [ContentService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Content.name,
                schema: ContentSchema,
            },
        ]),
    ],
    exports: [MongooseModule],
})
export class ContentModule {}
