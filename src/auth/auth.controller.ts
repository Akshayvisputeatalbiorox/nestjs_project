import { Body, Controller, Post,Param } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

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
                                                        
}

