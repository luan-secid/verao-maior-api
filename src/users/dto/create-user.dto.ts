import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  birthday: Date;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  city: string;
}
