import mongoose from "mongoose";

export class Schedule {
    resource: mongoose.Types.ObjectId
    date: Date;
    userId: mongoose.Types.ObjectId
    status: string;
}
