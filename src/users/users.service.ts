// users.service.ts
import { FindLoginUserDTO, SignUpDTO, SignupIdCheckDTO, SignupNickNameCheckDTO, UserInfoDTO, UserNicknameChangeDTO, UserPwdChangeDTO } from './dto/users.dto';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

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
    return await this.usersRepository.nicknameChange(user, body);
  }

  // 비밀번호 변경
  async passwordChange(user: FindLoginUserDTO, body: UserPwdChangeDTO) {
    return await this.usersRepository.passwordChange(user, body);
  }
}
