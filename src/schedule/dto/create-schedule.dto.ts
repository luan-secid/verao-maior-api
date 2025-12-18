import mongoose from "mongoose";

export class CreateScheduleDto {
    resource: mongoose.Types.ObjectId
    date: Date;
    userId: mongoose.Types.ObjectId
    status: string;
}
