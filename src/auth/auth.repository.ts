import { jwt } from './jwt/jwt.payload';
import { User } from '../model/users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async validate(payload: jwt) {
    if (payload) {
        const user = await this.userModel
        .findOne({ _id: payload._id })
        .select({ _id: 1, nickname: 1 });
        if (user) {
            return {
                _id: String(user._id),
                nickname: user.nickname,
            };
        }
    }  
    return false;
  }

  async login(id: string) {
    const user = await this.userModel.findOne({ id }).select({
      password: 1,
      salt: 1,
      nickname: 1,
    });
    if (user) {
      return user;
    } else {
      return false;
    }
  }

  async loginCheck(_id: string) {
    const user = await this.userModel.findOne({ _id }).select({
      
    });
    return;
  }
}