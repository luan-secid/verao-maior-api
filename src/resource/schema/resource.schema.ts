import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ResourceDocument = HydratedDocument<Resource>;

@Schema()
export class Resource {
    @Prop({ type: String })
    resource: String
    @Prop({ type: Date })
    date: Date
    @Prop({ type: String })
    status: string
    @Prop({ type: mongoose.Types.ObjectId })
    userId: mongoose.Types.ObjectId
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);