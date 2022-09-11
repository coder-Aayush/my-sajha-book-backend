import { Role } from "@prisma/client";
import { IsDate, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";



export class CreateUserDto{
    @IsEmail()
    email: string;
    

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;


    // @IsString()
    // @MinLength(4)
    // @MaxLength(20)
    // username: string;


    // name
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name?: string;

    // // created at
    // @IsDate()
    // createdAt?: Date;

    // // updated at
    // @IsDate()
    // updatedAt?: Date;

    // role?: Role;

    // // phone number
    // @IsMobilePhone()
    // phoneNumber?: string;


    // @IsString()
    // image? : string;


    token?: string;


}
