import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Translation {
  @Prop()
  ES: string;

  @Prop()
  EN: string;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
