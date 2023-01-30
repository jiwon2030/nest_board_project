// users.service.ts
import { FindLoginUserDTO, SignUpDTO, SignupIdCheckDTO, SignupNickNameCheckDTO, UserInfoDTO, UserNicknameChangeDTO, UserPwdChangeDTO } from './dto/users.dto';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { PasswordMaker } from 'src/utils/password';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/model/users.model';
import { Model } from 'mongoose';


@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository, @InjectModel(User.name) private readonly userModel: Model<User>) {}

  // id 중복여부 확인
  async findNotUseId(param: SignupIdCheckDTO) {
    const { id } = param;
    const check = await this.usersRepository.findUserId(id);
    if (check) {
      throw new ConflictException('존재하는 id');
    } else {
      return false;
    }
  }

  // 닉네임 중복여부 확인
  async findNotUseNickName(param: SignupNickNameCheckDTO) {
    const { nickname } = param;
    const check = await this.usersRepository.findUserNickName(nickname);
    if (check) {
      throw new ConflictException('존재하는 닉네임');
    } else {
      return false;
    }
  }
  
  // 회원가입
  async signUp(body: SignUpDTO) {
    const { id, nickname, password } = body;
    const idCheck = await this.usersRepository.findUserId(id);
    const nickNameCheck = await this.usersRepository.findUserNickName(nickname);
    if (!idCheck && !nickNameCheck) {
      await this.usersRepository.signUp({
        id,
        nickname,
        password,
      });
      return '회원가입 완료';
    }
    else {
      throw new ConflictException('존재하는 계정');
    }
  }

  // 마이페이지 조회
  async userInfo(user: UserInfoDTO) {
    return await this.usersRepository.userInfo(user);
  }

  // 닉네임 변경
  async nicknameChange(user: FindLoginUserDTO, body: UserNicknameChangeDTO) {
    const userinfo_id = user._id;    
    const user_info = await this.userModel.findOne({ _id: userinfo_id });   
    const { id } = user_info;
    console.log("user:", user);
    const { _id, nickname } = body;
    const body_id = body.id;
    const body_nickname = body.nickname;
    const idCheck = await this.usersRepository.findUserId(id);
    const nickNameCheck = await this.usersRepository.findUserNickName(nickname);
    console.log("idcheck:", idCheck);
    console.log("nickNameCheck:", nickNameCheck);
    if (idCheck && !nickNameCheck) {
      await this.usersRepository.nicknameChange(
        user,
        {
        id: body_id, 
        nickname: body_nickname
        });
      return user;
    }
    else { throw new NotFoundException("닉네임 변경 실패했습니다."); }
  }

  // 비밀번호 변경
  async passwordChange(user: FindLoginUserDTO, body: UserPwdChangeDTO) {
    const userinfo_id = user._id;
    const user_info = await this.userModel.findOne({ _id: userinfo_id });
    const { id } = user_info;
    console.log("user:", user);
    const body_id = body.id;
    const body_pw = body.password;
    const idCheck = await this.usersRepository.findUserId(id);
    console.log("idcheck:", idCheck);
    const makePassword = PasswordMaker(body_pw);
    if (idCheck) {
      await this.usersRepository.passwordChange(
        user,
        {
          id: body_id,
          password: makePassword.password,
          salt: makePassword.salt,
        });
      return user;
    } 
    else { throw new NotFoundException("비밀번호 변경 실패했습니다."); }
  }
  
}
