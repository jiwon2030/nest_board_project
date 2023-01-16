import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  authLeposityory: any;
  constructor(private readonly authService: AuthService) {}
  
  @ApiOperation({ summary: '로그인'})
  @ApiTags('login')
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 404,
    description: '아이디, 비밀번호가 틀림',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @Post()
  async login(
    @Res({ passthrough: true }) response: Response, 
    @Body() body: LoginDto) {
    console.log("요청")
    return this.authService.Login(response, body);
  }

  @ApiOperation({ summary: '로그아웃' })
  @ApiTags('logout')
  @ApiResponse({
    status: 200,
    description: '성공'
  })
  @ApiResponse({
    status: 404,
    description: '없는 계정'
  })
  @Post()
  async logout(@Res() res: Response) {
    res.cookie('jwt', '', {
      maxAge: 0
  })
  return res.send({
      message: 'success'
  })
  }

}


