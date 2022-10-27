import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './core/exceptions/exceptions.filter';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CloudinaryService, {provide: APP_FILTER, useClass: AllExceptionsFilter}],
})
export class AppModule {}
