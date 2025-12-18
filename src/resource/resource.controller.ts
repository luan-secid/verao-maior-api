import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Resource')
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourceService.create(createResourceDto);
  }

  @Get()
  findAll() {
    return this.resourceService.findAll();
  }

  @Get('findById/:id')
  findById(@Param('id') id: string) {
    return this.resourceService.findByUserId(id);
  }

  @Get('findByStatus/:status')
  findByStatus(@Param('status') status: string) {
    console.log(`Parametro: ${status}`);
    return this.resourceService.findByStatus(status);
  }

  @Get('findByUserId/:userId')
  findByUserId(@Param('userId') userId: string) {
    console.log(`Parametro: ${userId}`);
    return this.resourceService.findByUserId(userId);
  }

  @Get('findByResource/:resource')
  findByResource(@Param('resource') resource: string) {
    console.log(`Parametro: ${resource}`);
    return this.resourceService.findByResource(resource);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourceService.update(id, updateResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceService.remove(id);
  }
}
