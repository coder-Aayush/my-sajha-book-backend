import { Body, Global, Injectable, Request, UploadedFile } from '@nestjs/common';
import { User } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SetProfileDto } from './dto/set-profile-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly cloudinaryService: CloudinaryService) { }


  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        token: createUserDto.token,
        username: createUserDto.email.split('@')[0]+Math.floor(Math.random() * 1000),
      }
    });
  }

  async setProfile(@UploadedFile() file: Express.Multer.File, email: string, phoneNumber) {
    const profileImage = await this.cloudinaryService.uploadFile(file);
    return await this.prisma.user.update({
      where: {
        email: email
      },
      data: {
        image: profileImage.url,
        phoneNumber: phoneNumber,
      }
    });
  }

  async getUserFromJWTToken(token: string): Promise<User | null> {
    // const {email} = 
    return await this.prisma.user.findUnique({
      where: {
        token: token
      }
    });

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async signup(createUserDto: CreateUserDto) {
    return this.create(createUserDto);
  }


  // forgetPassword
  async forgetPassword(email: string) {
    const user = await this.findUserByEmail(email);
    if (user) {
      // send email
      return { message: 'Email sent' };
    }
    return { message: 'Email not found' };
  }

}
