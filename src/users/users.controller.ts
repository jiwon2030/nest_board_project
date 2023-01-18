import { Controller, Get, Post, Body, Put, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDTO, SignupIdCheckDTO, SignupNickNameCheckDTO, UserPwdChangeDTO } from './dto/users.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard  } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'id 중복여부 확인'})
  @ApiTags('signup')
  @Get('idcheck/:id')
  @ApiResponse({
    status:200,
    description: '성공',
  })
  @ApiResponse({
    status:409,
    description: 'id 존재',
  })
  @ApiResponse({
    status:500,
    description: 'Server Error',
  })
  async findNotUseId(@Param() param: SignupIdCheckDTO) {
    return this.usersService.findNotUseId(param);
  }

  @ApiOperation({ summary: '닉네임 중복여부 확인' })
  @ApiTags('signup')
  @Get('nickname-check/:nickName')
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 409,
    description: '닉네임 존재',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  async findNotUseNickName(@Param() param: SignupNickNameCheckDTO) {
    return await this.usersService.findNotUseNickName(param);
  }

  @ApiOperation({
    summary: '회원가입',
  })
  @ApiTags('signup')
  @Post('signup')
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 409,
    description: '계정 존재',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  async signup(@Body() body: SignUpDTO) {
    return await this.usersService.signUp(body);
  }

  @ApiTags('user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저정보 조회'})
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 404,
    description: '계정 존재 하지 않음',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @Get('user_info')
  async userInfo(user: SignUpDTO) {
    return await this.usersService.userInfo(user);
  }

  @ApiTags('user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 404,
    description: '계정 존재 하지 않음',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @Put('password')
  async passwordChange(@Body() body: UserPwdChangeDTO) {
    return await this.usersService.passwordChange(body);
  }
}
