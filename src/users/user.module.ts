import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';


@Module({
  imports:[TypeOrmModule.forFeature([User])],
//   controllers: [useCntro],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
