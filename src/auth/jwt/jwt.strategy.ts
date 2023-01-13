import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport';
import { jwt } from './jwt.payload';
import { AuthRepository } from './../auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authRepository: AuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWTSECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: jwt) {
    const user = await this.authRepository.validate(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    else { return user; }    
  }
}