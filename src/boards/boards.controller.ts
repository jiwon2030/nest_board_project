import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardFindBasicDTO, CreateBoardDTO, LoginUserCheckDTO, UpdateBoardDTO } from './dto/board.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) { }

  @ApiOperation({ summary: '게시판 전체 페이지 조회'})
  @ApiTags('board')
  @Get('/')
  async getAllBoard() {
    return await this.boardsService.getAllBoards();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시판 글 등록'})
  @ApiTags('board')
  @Post('create')
  async createBoard(@Req() user, @Body() board: CreateBoardDTO) {
      return await this.boardsService.createBoard(user, board);
  }

  @ApiOperation({ summary: '게시판 글 상세 페이지'})
  @ApiTags('board')
  @Get(':uid')
  async getBoardById(@Param() _id: BoardFindBasicDTO) {
    return await this.boardsService.getBoardById(_id); 
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시판 글 수정'})
  @ApiTags('board')
  @Patch(':uid')
  async updateBoard(
    @Param('uid') _id: BoardFindBasicDTO,
    @Req() user: LoginUserCheckDTO,
    @Body() updateBoardDTO: UpdateBoardDTO
  ) {
    return await this.boardsService.updateBoard(_id, user, updateBoardDTO);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시판 글 삭제'})
  @ApiTags('board')
  @Delete(':uid')
  async deleteBoard(
    @Param('uid') _id: BoardFindBasicDTO, 
    @Req() user: LoginUserCheckDTO
    ) {
    return await this.boardsService.deleteBoard(_id, user);
  }
}