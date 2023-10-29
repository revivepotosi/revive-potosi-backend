import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Translation, TranslationSchema } from './translation.entity';

@Schema()
export class Day extends Document {
  @Prop({
    schema: TranslationSchema,
    unique: true,
    index: true,
  })
  name: Translation;
}

export const DaySchema = SchemaFactory.createForClass(Day);
