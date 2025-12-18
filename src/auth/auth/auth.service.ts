import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constant';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  password = '';
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(user: AuthUserDto) {
    let userValid: User | null = new User();
    userValid = await this.validateUser(user.email, user.password);
    if (userValid === null) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Usuário ou senha incorreto.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      const payload = { sub: userValid.email, username: userValid.name };
      return {
        token: await this.jwtService.signAsync(payload, { secret: jwtConstants.secret }),
        email: userValid.email
      };
    }
  }

  async validateUser(email: string, password: string) {
    let user = new User();
    user = await this.userService.findByEmail(email);
    if (user) {
      const isPasswordValid = bcrypt.compareSync(
        password,
        user.password as string,
      );
      if (isPasswordValid === true) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
