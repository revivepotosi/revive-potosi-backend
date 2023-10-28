import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Periodo {
  @Prop()
  hora_inicio: string;

  @Prop()
  hora_fin: string;
}

@Schema()
export class Horario {
  @Prop()
  día: string;

  @Prop({ type: [Periodo] })
  periodos: Periodo[];
}

@Schema()
export class AtraccionTuristica extends Document {
  @Prop()
  name: string;

  @Prop({ type: [Horario] })
  horario: Horario[];
}

export const AtraccionTuristicaSchema =
  SchemaFactory.createForClass(AtraccionTuristica);
