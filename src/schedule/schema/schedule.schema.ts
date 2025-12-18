import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
    @Prop({ type: mongoose.Types.ObjectId })
    resource: mongoose.Types.ObjectId
    @Prop({ type: Date })
    date: Date;
    @Prop({ type: mongoose.Types.ObjectId })
    userId: mongoose.Types.ObjectId
    @Prop({ type: String })
    status: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);