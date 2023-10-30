import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  isActivate: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
