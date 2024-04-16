import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs'
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { payloadType } from './types';

@Injectable()
export class AuthService {
    constructor(private userService:UsersService,
        private jwtService : JwtService,
        private artistsService:ArtistsService

    ){}

    async login( loginDTO: LoginDTO ): Promise< {accessToken:string} > {
        const user = await this.userService.findOne(loginDTO);

        const passwordMatch = await bcrypt.compare(
            loginDTO.password,
            user.password,
        );


        if(passwordMatch){
            delete user.password
           const payload : payloadType = { email:user.email ,userId: user.id }
           const artist  = await this.artistsService.findArtist(user.id);
           if(artist){  
            payload.artistId = artist.id
           }

           return {
            accessToken: this.jwtService.sign(payload),
           }

        }else{
            throw new UnauthorizedException('password does not match');
        }
    }
}
