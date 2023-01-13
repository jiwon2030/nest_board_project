import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import { AuthRepository } from './auth.repository';
import { PasswordDecoding } from 'src/utils/password';
import { User } from '../model/users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private readonly authRepository: AuthRepository,
  ) {}

  async Login(body: LoginDto) {
    const { id, password } = body;
    const user = await this.authRepository.login(id);
    if (user) {
      const checkPwd = PasswordDecoding({
        password,
        salt: user.salt,
        userPassword: user.password,
      });
      if (checkPwd) {
        const token = await this.jwtService.sign({
          _id: user._id,
          nickname: user.nickname,
        });
        return { token };
      }
    } else {
      throw new UnauthorizedException();
    }
  }
  
}
