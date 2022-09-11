import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGurd } from './auth/jwt-auth.gurd';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) {}


  @UseGuards(JwtAuthGurd)
  @Get()
  async getHello(@Req() req): Promise<string> {
    return this.appService.getHello(req);
  }

  @Get('users')
  async getUsers() {
    return await this.prisma.user.findMany();
  }
}
