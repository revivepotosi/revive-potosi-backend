import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AtraccionTuristicaType extends Document {
  @Prop({ unique: true })
  type: string;
}

export const AtraccionTuristicaTypeSchema = SchemaFactory.createForClass(
  AtraccionTuristicaType,
);
