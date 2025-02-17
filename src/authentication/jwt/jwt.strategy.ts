import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: process.env.IGNORE_EXPIRATION,
            secretOrKey: process.env.JWT_CONSTANT,
          });
    }

    async validate(payload: any){
        return { id: payload.sub, username: payload.username };
    }
}