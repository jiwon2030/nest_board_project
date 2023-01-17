import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import { AuthRepository } from './auth.repository';
import { PasswordDecoding } from 'src/utils/password';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async Login(res: Response, body: LoginDto) {
    const { id, password } = body;
    const user = await this.authRepository.login(id);
    if (user) {
      const checkPwd = PasswordDecoding({
        password,
        salt: user.salt,
        userPassword: user.password,
      });
      if (checkPwd) {
        const token = this.jwtService.sign({
          _id: user._id,
          nickname: user.nickname,
        });
        res.cookie('user', token);
        return { token };
      }
    } else {
      throw new UnauthorizedException('user does not exist');
    }
  }

}
