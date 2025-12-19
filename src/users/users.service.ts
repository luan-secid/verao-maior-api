import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private usersModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<any> {
    if ((await this.avoidDuplicity(createUserDto.email)) == false) {
      const createUser = new this.usersModel(createUserDto);
      return await createUser.save();
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Usuário já cadastrado.',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async findAll() {
    return await this.usersModel.find().exec();
  }

  async findByEmail(email: string) {
    const query: any = { email: email };
    try {
      const result = await this.usersModel.findOne(query).exec();
      if (result) {
        return result;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Usuário não encontrado.',
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

  async avoidDuplicity(email: string) {
    const query: any = { email: email };
    const result = await this.usersModel.findOne(query).exec();
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async findById(id: string) {
    const query: any = { _id: id };
    try {
      const result = await this.usersModel.findOne(query).exec();
      if (result) {
        return result;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Usuário não encontrado.',
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const find = this.usersModel.findById(id);
    if (!find) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      return await this.usersModel.findByIdAndUpdate(
        { _id: id },
        { $set: updateUserDto },
        { new: true },
      );
    }
  }

  async remove(id: string) {
    const query: any = { user: new mongoose.Types.ObjectId(id) };
    return await this.usersModel.deleteOne(query).exec();
  }
}
