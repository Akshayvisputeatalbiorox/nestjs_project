import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

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

}
