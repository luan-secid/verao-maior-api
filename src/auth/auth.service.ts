import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectConnection() private connection: Connection,
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(
        email: string,
        senha: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findByEmail(email);
        const secretKey = process.env.JWT_SECRET;
        if (user?.password !== senha) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.name, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload, {secret: secretKey}),
        };
    }
}
