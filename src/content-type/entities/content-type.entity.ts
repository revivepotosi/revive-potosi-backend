import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ContentType extends Document {
  @Prop({ unique: true })
  type: string;
}

export const ContentTypeSchema = SchemaFactory.createForClass(ContentType);
