import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  Translation,
  TranslationSchema,
} from 'src/common/entities/translation.entity';

@Schema()
export class Content extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'AtraccionTuristica' })
  atraccionTuristica: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ContentType' })
  type: string;
  @Prop(TranslationSchema)
  text?: Translation;
  @Prop()
  video?: string;
  @Prop()
  image?: string;
  @Prop()
  images?: string[];
  @Prop()
  position: number;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
