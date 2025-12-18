import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateUserDto extends PartialType(CreateAuthDto) {
  @ApiProperty()
  email: string;
  @ApiProperty()
  senha: string;
}
