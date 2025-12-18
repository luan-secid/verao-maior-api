import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateResourceDto } from './create-resource.dto';
import mongoose from 'mongoose';

export class UpdateResourceDto extends PartialType(CreateResourceDto) {
    @ApiProperty()
    resource: string
    @ApiProperty()
    date: Date
    @ApiProperty()
    status: string
    @ApiProperty()
    userId: mongoose.Types.ObjectId
}
