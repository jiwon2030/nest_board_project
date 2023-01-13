// users.service.ts
import { SignUpDTO, SignupIdCheckDTO, SignupNickNameCheckDTO, UserNicknameChangeDTO, UserPwdChangeDTO } from './dto/users.dto';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { PasswordMaker } from 'src/utils/password';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // id 중복여부 확인
  async findNotUseId(param: SignupIdCheckDTO) {
    const { id } = param;
    const check = await this.usersRepository.userIdCheck(id);
    if (check) {
      throw new ConflictException();
    } else {
      return '';
    }
  }

  // 닉네임 중복여부 확인
  async findNotUseNickName(param: SignupNickNameCheckDTO) {
    const { nickname } = param;
    const check = await this.usersRepository.findUseNickName(nickname);
    if (check) {
      throw new ConflictException();
    } else {
      return '';
    }
  }
  
  // 회원가입
  async signUp(body: SignUpDTO) {
    const { id, nickname, password } = body;
    const idCheck = await this.usersRepository.userIdCheck(id);
    const nickNameCheck = await this.usersRepository.findUseNickName(nickname);
    if (!idCheck && !nickNameCheck) {
      await this.usersRepository.signUp({
        id,
        nickname,
        password,
      });
      return '';
    }
    else {
      throw new ConflictException();
    }
  }

  // 마이페이지 조회
  async userInfo(user: SignUpDTO) {
    return await this.usersRepository.userInfo(user);
  }

  // 닉네임 변경
  async nicknameChange(body: UserNicknameChangeDTO) {
    const { id, nickname } = body;
    const idCheck = await this.usersRepository.userIdCheck(id);
    const nickNameCheck = await this.usersRepository.findUseNickName(nickname);
    const changeNickName = nickname
    ;
    if (idCheck && !nickNameCheck) {
      await this.usersRepository.nicknameChange({
        id,
        nickname: changeNickName,
      });
      return '';
    }
    else { throw new NotFoundException(); }
  }

  // 비밀번호 변경
  async passwordChange(body: UserPwdChangeDTO) {
    const { id, pwd } = body;
    const idCheck = await this.usersRepository.userIdCheck(id);
    const makePassword = PasswordMaker(pwd);
    if (idCheck) {
      await this.usersRepository.passwordChange({
        id,
        password: makePassword.password,
        salt: makePassword.salt,
      });
      return '';
    } 
    else { throw new NotFoundException(); }
  }
}
