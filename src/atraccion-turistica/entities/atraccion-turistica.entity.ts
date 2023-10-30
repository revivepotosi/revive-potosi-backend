import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  Translation,
  TranslationSchema,
} from 'src/common/entities/translation.entity';

@Schema({ _id: false })
export class Period {
  @Prop()
  startTime: string;

  @Prop()
  endTime: string;
}

@Schema({ _id: false })
export class Schedule {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Day' })
  day: string;

  @Prop([{ type: Period }])
  periods: Period[];
}

@Schema()
export class AtraccionTuristica extends Document {
  @Prop(TranslationSchema)
  name: Translation;

  @Prop([{ type: Schedule }])
  schedule: Schedule[];

  @Prop()
  address: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}

export const AtraccionTuristicaSchema =
  SchemaFactory.createForClass(AtraccionTuristica);
