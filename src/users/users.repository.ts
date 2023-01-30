// users.repository.ts
import { FindLoginUserDTO, SignUpDTO, UserInfoDTO, UserNicknameChangeDTO, UserPwdChangeDTO } from './dto/users.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './../model/users.model';
import { PasswordMaker } from 'src/utils/password';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // id 중복여부 확인
  async findUserId(id: string) {
    console.log(id);
    const user = await this.userModel.findOne({ id }).exec();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  // 닉네임 중복여부 확인
  async findUserNickName(nickname: string) {
    const user = await this.userModel.findOne({ nickname }).select({ _id: 1 }).exec();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  // 회원가입
  async signUp({ id, nickname, password }: SignUpDTO) {
    const user = await this.userModel.findOne({ id, nickname }).exec();
    if (!user) {
        const makePassword = PasswordMaker(password);
        console.log(makePassword)
        await this.userModel.create({
          id,
          password: makePassword.password,
          salt: makePassword.salt,
          nickname,
        });
        return true;
      } else {
        return false;
      }
  }

  // 마이페이지 조회
  async userInfo(user: UserInfoDTO) {
    const { _id } = user;
    const user_info = await this.userModel
        .findOne({ _id })
        .select({ _id: 0, id: 1, nickname: 1 }).exec();
    if (user_info) {
      return user_info;
    }
    else {
      throw new NotFoundException("유저를 찾을 수 없습니다.");
    }   
  }

  // 닉네임 변경
  async nicknameChange(user: FindLoginUserDTO, body: UserNicknameChangeDTO) {
    const { _id } = user;
    const { nickname } = body;
    await this.userModel.updateOne({ _id }, { nickname });
  }

  // 비밀번호 변경
  async passwordChange(user: FindLoginUserDTO, body: UserPwdChangeDTO) {
    const { _id } = user;
    const { password, salt } = body;
    return await this.userModel.updateOne({ _id }, { password, salt });
  }
}