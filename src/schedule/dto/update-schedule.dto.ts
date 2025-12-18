import { PartialType } from '@nestjs/swagger';
import { CreateScheduleDto } from './create-schedule.dto';
import mongoose from 'mongoose';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
    resource: mongoose.Types.ObjectId
    date: Date;
    userId: mongoose.Types.ObjectId
    status: string;
}
