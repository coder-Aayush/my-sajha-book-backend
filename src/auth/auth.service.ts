import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }
    async hasPassword(password: string) {
        return (await bcrypt.hash(password, 12));
    }


    async comparePassword(password: string, storedPassword: string): Promise<boolean | undefined> {
        // console.log("hello hi ", password, storedPassword);

        // return await bcrypt.compare('1', '1');
        return await bcrypt.compare(password, storedPassword);
    }

    async validate(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            return null;
        }
        const isPasswordValid: boolean = await this.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }


    async login(loginUserDto : LoginUserDto): Promise<{ access_token: string, user: any }> {
        const hasUser = await this.usersService.checkIfUserExist(loginUserDto.email);
        if (!hasUser){
            throw new HttpException('No User Associate with provided Email', HttpStatus.NOT_FOUND);
        }
        const {email, password} = loginUserDto;
        const payload = {
            email
        }

        const {id, username, role} : User= await this.usersService.findUserByEmail(loginUserDto.email);

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id,
                username,
                email
                
            }
        }
    }


    async signup(createUserDto: CreateUserDto): Promise<User> {
        if (await this.usersService.checkIfUserExist(createUserDto.email)) {
            throw new HttpException('User already exists', HttpStatus.NOT_FOUND);
        }
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(createUserDto.password, salt);
        const { email, name } = createUserDto;
        const payload = {
            email
        }
        const user = await this.usersService.create({
            email,
            name,
            password,
            token: this.jwtService.sign(payload),
        });
        return user;
    }




}
