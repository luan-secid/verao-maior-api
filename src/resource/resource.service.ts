import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Resource } from './schema/resource.schema';

@Injectable()
export class ResourceService {
  constructor(@InjectModel(Resource.name) private resourceModel: Model<Resource>) { }

  async create(createResourceDto: CreateResourceDto) {
    const createResource = new this.resourceModel(createResourceDto);
    return await createResource.save();
  }

  async findAll() {
    return await this.resourceModel.find().exec();
  }

  async findOne(id: string) {
    const query: any = { _id: id };
    try {
      const result = await this.resourceModel.findOne(query).exec();
      if (result) {
        return result;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Horário não encontrado.',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Não foi possível realizar a busca.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByUserId(userId: string) {
    const query: any = { userId: `${userId}` }
    try {
      const result = await this.resourceModel.find(query).exec();
      console.log(result);
      if (result) {
        return result;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Nenhum horário foi encontrado.',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Não foi possível realizar a busca do horário.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByStatus(status: string) {
    console.log(status);
    const query: any = { status: `${status}` };
    console.log(query);
    try {
      const result = await this.resourceModel.find(query).exec();
      console.log(result);
      if (result) {
        return result;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Nenhum horário foi encontrado.',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Não foi possível realizar a busca do horário.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByUser(userId: string) {
    const query: any = { userId: userId };
    try {
      const result = await this.resourceModel.find(query).exec();
      console.log(result);
      if (result) {
        return result;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Nenhum horário foi encontrado.',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Não foi possível realizar a busca do horário.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  async findByResource(resource: string) {
    console.log(resource);
    const query: any = { resource: `${resource}` };
    console.log(query);
    try {
      const result = await this.resourceModel.find(query).exec();
      console.log(result);
      if (result) {
        return result;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Nenhum espaço foi encontrado.',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Não foi possível realizar a busca deste espaço.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateResourceDto: UpdateResourceDto) {
    const find = this.resourceModel.findById(id);
    if (!find) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      return await this.resourceModel.findByIdAndUpdate({ _id: id }, { $set: updateResourceDto }, { new: true },);
    }
  }

  async remove(id: string) {
    const query: any = { user: new mongoose.Types.ObjectId(id) };
    return await this.resourceModel.deleteOne(query).exec();
  }
}
