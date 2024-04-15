import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity'; // Import the User entity
import { JwtModule } from '@nestjs/jwt';
import { authConstant } from './auth.constant';
import { jwtStrategy } from './jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({secret:authConstant.secret,

    signOptions:{
      expiresIn:'1d'
    }
  })], // Import and configure TypeOrmModule for the User entity
  providers: [AuthService, UsersService,jwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

