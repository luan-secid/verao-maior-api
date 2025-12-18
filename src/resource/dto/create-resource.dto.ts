import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class CreateResourceDto {
    @ApiProperty()
    resource: string
    @ApiProperty()
    date: Date
    @ApiProperty()
    status: string
    @ApiProperty()
    userId: mongoose.Types.ObjectId
}
