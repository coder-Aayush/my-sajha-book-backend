import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseInterceptors, UploadedFile, UseGuards, Req, BadRequestException, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileURLToPath } from 'url';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGurd } from 'src/auth/jwt-auth.gurd';
import { Request } from "express";
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('signup')
  @HttpCode(200)
  signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.signup(createUserDto);
  }

  @Post('profile-setup')
  @HttpCode(200)
  @UseGuards(JwtAuthGurd)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './images',
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    })
  }))
  async setProfile(@UploadedFile() file: Express.Multer.File, @Req() request: Request): Promise<any> {
    if (request.body.phone_number != null || request.body.phone_number != undefined){
      const { email } = request.user as User;
    const { phone_number } = request.body;
    
    return await this.usersService.setProfile(file, email, phone_number);
    }else {
      return new HttpException('Phone number is required', 400);
    }
  }

  // forget password
  @Post('forget-password')
  @HttpCode(200)
  forgetPassword(@Body() body: any): Promise<any> {
    return this.usersService.forgetPassword(body);
  }
  
}
