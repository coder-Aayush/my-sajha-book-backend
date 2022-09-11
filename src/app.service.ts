import { Injectable, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGurd } from './auth/jwt-auth.gurd';

@Injectable()
export class AppService {
  async getHello(@Request() req): Promise<string> {
    return `Hello world!`;
  }
}
