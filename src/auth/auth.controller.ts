import { Body, Controller, ExecutionContext, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { User } from "@prisma/client";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { LoginUserDto } from "./dto/login-user.dto";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly userServices: UsersService) { }

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    async login(@Body() body: LoginUserDto, ): Promise<User | any> {
        const { access_token, user } = await this.authService.login(body);
        return { access_token, user};
    }

    @Post('/signup')
    @UsePipes(LocalAuthGuard)
    async signup(@Body() body: CreateUserDto): Promise<User | any> {
        const user = await this.authService.signup(body);
        return { user };
    }

}