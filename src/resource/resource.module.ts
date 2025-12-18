import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resource } from './entities/resource.entity';
import { ResourceSchema } from './schema/resource.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Resource.name, schema: ResourceSchema }])],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
