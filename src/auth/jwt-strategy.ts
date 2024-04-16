import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstant } from "./auth.constant";
import { payloadType } from "./types";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey : authConstant.secret,
        });
    }

    async validate( payload:payloadType ){
        return { 
            userId:payload.userId, 
            email:payload.email,
            artistId:payload.artistId }
    }
}