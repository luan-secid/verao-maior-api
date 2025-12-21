import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { CreateAuthDto } from './../auth/dto/create-auth.dto';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const salt = 10;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const password = await bcrypt.hash(createUserDto.password, salt);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createUserDto.password = password;
      return this.usersService.create(createUserDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro no Bcrypt:', error.message);
      } else {
        console.error('Ocorreu um erro desconhecido', error);
      }
    }
  }

  @Post('login')
  async validateUser(@Body() authUserDto: CreateAuthDto): Promise<{
    access_token: string;
    payload: { sub: string; username: string };
  }> {
    const userAuth = await this.usersService.findByEmail(authUserDto.email);
    console.log('email do login: ', authUserDto.email);
    console.log('senha do login: ', authUserDto.password);
    if (
      !userAuth ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      !(await bcrypt.compare(authUserDto.password, userAuth.password))
    ) {
      throw new UnauthorizedException();
    }
    const payload = { sub: userAuth.email, username: userAuth.name };
    const secretKey = process.env.JWT_SECRET;
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: secretKey,
      }),
      payload,
    };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('findById/:id')
  findById(@Param() params: { id: string }) {
    return this.usersService.findById(params.id);
  }

  @Get('findByEmail/:email')
  findByEmail(@Param('email') email: string) {
    console.log(`Parametro: ${email}`);
    return this.usersService.findByEmail(email);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
