import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { jwtSecret } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
            ignoreExpiration: false,
        })
    }

    
    async validate(payload: { email: string, id: string }) : Promise<User|null> {
        return await this.userService.findUserByEmail(payload.email);
    }

}