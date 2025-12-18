import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
    @Prop({ type: String })
    email: string;
    @Prop({ type: String })
    senha: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);