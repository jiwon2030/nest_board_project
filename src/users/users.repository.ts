// users.repository.ts
import { SignUpDTO } from './dto/users.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './../model/users.model';
import { PasswordMaker } from 'src/utils/password';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // id 중복여부 확인
  async findUseId(id: string) {
    const user = await this.userModel.findOne({ id }).select({ _id: 1, id: 1 });
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  // 닉네임 중복여부 확인
  async findUseNickName(nickname: string) {
    const user = await this.userModel.findOne({ nickname }).select({ _id: 1 });
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  // 회원가입
  async signUp({ id, nickname, password }: SignUpDTO) {
    const user = await this.userModel.findOne({ id, nickname });
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
  async userInfo(user: SignUpDTO) {
    const { id } = user;
    const user_info = await this.userModel
        .findOne({ id })
        .select({ _id: 1, nickname: 1, password: 1 });
    return user_info;
  }

  // 닉네임 변경
  async nicknameChange({ id, nickname }) {
    await this.userModel.updateOne({ id }, { nickname });
  }

  // 비밀번호 변경
  async passwordChange({ id, password, salt }) {
    await this.userModel.updateOne({ id }, { password, salt });
  }
}