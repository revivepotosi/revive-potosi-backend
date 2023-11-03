import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  Translation,
  TranslationSchema,
} from 'src/common/entities/translation.entity';

@Schema()
export class Day extends Document {
  @Prop(TranslationSchema)
  name: Translation;
  @Prop({
    unique: true,
    index: true,
  })
  position: number;
}

export const DaySchema = SchemaFactory.createForClass(Day);
