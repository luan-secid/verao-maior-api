import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  age: number;
  @Prop({ required: true })
  birthday: Date;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phoneNumber: string;
  @Prop({ required: true })
  state: string;
  @Prop({ required: true })
  city: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
