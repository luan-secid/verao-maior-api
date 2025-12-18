import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    console.log(`Email: ${email} Password: ${password}`);
    const user = await this.authService.validateUser(email, password);
    console.log(`Esse é o user ${user}`);
    if (!user) {
      throw new UnauthorizedException(
        'Usuário ou senha inválidos. Verifique e tente novamente',
      );
    }
    return user;
  }
}
