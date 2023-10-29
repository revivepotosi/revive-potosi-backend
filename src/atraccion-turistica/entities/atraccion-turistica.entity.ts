import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  Translation,
  TranslationSchema,
} from 'src/common/entities/translation.entity';

@Schema()
export class Periodo {
  @Prop()
  hora_inicio: string;

  @Prop()
  hora_fin: string;
}

@Schema()
export class Horario {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Day' })
  dia: string;

  @Prop([{ type: Periodo }])
  periodos: Periodo[];
}

@Schema()
export class AtraccionTuristica extends Document {
  @Prop(TranslationSchema)
  name: Translation;

  @Prop([{ type: Horario }])
  horario: Horario[];
}

export const AtraccionTuristicaSchema =
  SchemaFactory.createForClass(AtraccionTuristica);
