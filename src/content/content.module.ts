import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './entities/content.entity';
import { ContentType, ContentTypeSchema } from './entities/contentType.entity';

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
    MongooseModule.forFeature([
      {
        name: ContentType.name,
        schema: ContentTypeSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class ContentModule {}
