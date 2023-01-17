import { Controller, UseGuards, Post, Body, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

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
    @Res({ passthrough: true }) res: Response, 
    @Body() body: LoginDto) {
    console.log("요청")
    return this.authService.Login(res, body);
  }

  @UseGuards(AuthGuard())
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
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send({ message: 'success' });
  }

}


