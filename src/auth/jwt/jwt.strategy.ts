import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwt } from './jwt.payload';
import { AuthRepository } from './../auth.repository';
import { Request } from 'express';

const cookieExtractor = function (req: Request) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['user'];
  }
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authRepository: AuthRepository) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWTSECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: jwt) {
    const user = await this.authRepository.validate(payload);
    if (!user) {
      throw new UnauthorizedException({message: 'user does not exist'});
    }
    else { return user; }    
  }
}