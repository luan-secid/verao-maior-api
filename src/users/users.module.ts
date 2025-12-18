import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { usersProviders } from './users.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  exports: [UsersService],
  providers: [
    UsersService,
    AuthService,
    JwtService,
    ...usersProviders,
  ],
})
export class UsersModule {}
