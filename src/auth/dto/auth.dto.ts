import { PickType } from '@nestjs/swagger';
import { User } from 'src/model/users.model'

export class LoginDto extends PickType(User, ['id', 'password'] as const) {}
