import { Body, Controller, Post,Param, UseGuards, Get, Request } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { jwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from './types';
import { ValidateTokenDTO } from './dto/validate.token.dto';
import { Verify } from 'crypto';

@Controller('auth')
export class AuthController {
   constructor(private userService: UsersService,
      private authService:AuthService
   ) {}
   @Post('signup')
   signup(
    @Body()
    userDTO:CreateUserDTO,
   ): Promise<User> {
        return this.userService.create(userDTO);
   }

//    @Post('register/:step')
//  async register(
//     @Param('step') step: number,
//     @Body()
//     userDTO:CreateUserDTO,
//    ):Promise<User>{
//     return this.userService.submitFormData(step,userDTO)
//    }


  @Post('login')
login(
   @Body()
   loginDTO : LoginDTO,
){
   return this.authService.login(loginDTO);
 }

 @Get('enable-2fa')
 @UseGuards(jwtAuthGuard)
 enable2FA(
   @Request() req ,
 ): Promise<Enable2FAType> { 
    return this.authService.enable2FA(req.user.userId)
 }
 
 @Post('validate-2fa')
 @UseGuards(jwtAuthGuard)
 validate2FA(
   @Request() req ,
   @Body()
   ValidateTokenDTO:ValidateTokenDTO,
 ):Promise<{Verify:boolean}>{
   return this.authService.validate2FAToken(
      req.user.userId,
      ValidateTokenDTO.token
   )
 }
                                                        
}

