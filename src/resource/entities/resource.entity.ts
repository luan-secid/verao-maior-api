import mongoose from "mongoose"

export class Resource {
    resource: string
    date: Date
    status: string
    userId: mongoose.Types.ObjectId
}
