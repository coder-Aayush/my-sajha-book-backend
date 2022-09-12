import { Role } from "@prisma/client";
import { IsDate, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";



export class SetProfileDto{
    @IsPhoneNumber()
    phoneNumber: string;

    
}
