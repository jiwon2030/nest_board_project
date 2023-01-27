import { PickType, ApiProperty } from '@nestjs/swagger';
import { User } from '../../model/users.model'

export class SignupIdCheckDTO extends PickType(User, ['id'] as const) {}

export class SignupNickNameCheckDTO extends PickType(User, ['nickname'] as const) {}

export class SignUpDTO extends PickType(User, [
    'id',
    'nickname',
    'password',
] as const) {}

export class UserInfoDTO extends PickType(User, [
    '_id',
    'nickname'
] as const ) {
  id: string;
}

export class FindLoginUserDTO extends PickType(User, [
    'id',
    'nickname'
] as const) {}

export class UserNicknameChangeDTO extends PickType(User, ['id'] as const) {
    @ApiProperty({
        example: 'testnickname',
    })
    nickname: string;
}

export class UserPwdChangeDTO extends PickType(User, ['id'] as const) {
    @ApiProperty({
      example: '1234qwer',
    })
    password: string;
    salt: string;
}