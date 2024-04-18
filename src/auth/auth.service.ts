import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs'
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Enable2FAType, payloadType } from './types';

import * as speakeasy from 'speakeasy'
import { authenticate, use } from 'passport';
@Injectable()
export class AuthService {
    constructor(private userService:UsersService,
        private jwtService : JwtService,
        private artistsService:ArtistsService

    ){}

    async login( loginDTO: LoginDTO ): Promise< {accessToken:string} | {validate2FA: string , message: string} > {
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

        //   if(user.enable2FA && user.twoAFSecret){
        //     return{
        //         validate2FA :"http://localhost:3000/auth/validate-2fa",
        //         message:"please send one time time,e passswrd from your google authenticate app"
        //     }
        //   }

           return {
            accessToken: this.jwtService.sign(payload),
           }

        }else{
            throw new UnauthorizedException('password does not match');
        }
    }

    async enable2FA(userId:number) : Promise<Enable2FAType> {
       const user = await this.userService.findById(userId)
       if(user.enable2FA){
        return {secret:user.twoAFSecret}
       }
       const secret = speakeasy.generateSecret();
       console.log(secret);
       user.twoAFSecret = secret.base32 ;
       await this.userService.updateSecrateKey( user.id,user.twoAFSecret )
       return {secret:user.twoAFSecret}
    }

    async validate2FAToken(
        userId:number,
        token:string,
    ): Promise<{Verify:boolean}>{
     try {
        const user = await this.userService.findById(userId)
        console.log(token)
        const verified = speakeasy.totp.verify({
            secret:user.twoAFSecret,
            token:token,
            encoding:'base32'
        });
        if(verified){
            return {Verify:true}
        }else{
            return {Verify:false}
        }
     } catch (error) {
        throw new UnauthorizedException('error verified tken')
     }
    } 
}

