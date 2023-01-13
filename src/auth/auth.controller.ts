import { Controller, Get, Post, Body, UseGuards, Res, Req, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
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
  async login( @Body() body: LoginDto ) {
    return this.authService.Login(body);
  }
}


