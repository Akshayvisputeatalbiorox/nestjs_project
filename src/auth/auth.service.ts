import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs'
import { error } from 'console';

@Injectable()
export class AuthService {
    constructor(private userService:UsersService){}

    async login( loginDTO: LoginDTO ): Promise< User > {
        const user = await this.userService.findOne(loginDTO);

        const passwordMatch = await bcrypt.compare(
            loginDTO.password,
            user.password
        )
        if(passwordMatch){
            delete user.password
            return user
        }else{
            throw new UnauthorizedException('password does not match');
        }
    }
}
