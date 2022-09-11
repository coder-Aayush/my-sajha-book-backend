import { Global, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor (private readonly prisma: PrismaService) {}


  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({data: {
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
      token: createUserDto.token,
    }});
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({where: {email}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async signup(createUserDto: CreateUserDto){
    return this.create(createUserDto);
  }



}
