import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createUserDTO: CreateUserDTO): Promise<User> {
        const { password, ...userData } = createUserDTO;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance and copy properties
        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword
        });

        const savedUser = await this.userRepository.save(user);

        // Remove password from the result, we can also avoid this by using class-transformer
        delete savedUser.password
        return savedUser;
    }


    // async submitFormData(step: number,createUserDTO: CreateUserDTO): Promise<User> {
    //     const formStep = this.userRepository.create( createUserDTO );
    //     await this.userRepository.save(formStep);
    //     return formStep
    //   }

    async findOne(data : LoginDTO) : Promise <User> {
       const user = await this.userRepository.findOneBy({ email:data.email })
       if(!user){
        throw new UnauthorizedException('could not find user');
       }
       return user;
    }

    async findById(id:number):Promise<User>{
        return  this.userRepository.findOneBy({id:id})
    }

    async updateSecrateKey(userId,secret:string){
         return this.userRepository.update(
            {id:userId},
            {
                twoAFSecret:secret,
                enable2FA:true
            }
         )
    }

}
