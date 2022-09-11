import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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


   async login(email: string): Promise<{ access_token: string, user: User }> {
        const payload = {
            email
        }

        const user = await this.usersService.findUserByEmail(email);

        return {
            access_token: this.jwtService.sign(payload),
            user,
        }
    }


    async signup(createUserDto: CreateUserDto): Promise<User> {
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
