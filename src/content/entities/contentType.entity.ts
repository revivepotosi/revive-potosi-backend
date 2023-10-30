import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ContentType extends Document {
  @Prop()
  type: string;
}

export const ContentTypeSchema = SchemaFactory.createForClass(ContentType);
