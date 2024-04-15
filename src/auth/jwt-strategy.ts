import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstant } from "./auth.constant";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey : authConstant.secret,
        });
    }


    async validate( payload:any ){
        return { userId:payload.sub,emil:payload.email }
    }
}