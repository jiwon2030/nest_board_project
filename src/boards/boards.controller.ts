import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from 'src/model/boards.model'
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) { }

  @ApiOperation({ summary: '게시판 전체 페이지 조회'})
  @ApiTags('board')
  @Get('/')
  async getAllBoard() {
    return this.boardsService.getAllBoards();
  }

  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '게시판 글 등록'})
  @ApiTags('board')
  @Post()
  async createBoard(@Req() req, @Body() board: CreateBoardDto) {
      return this.boardsService.createBoard(req.user, board);
  }

  @ApiOperation({ summary: '게시판 글 상세 페이지'})
  @ApiTags('board')
  @Get(':id')
  async getBoardById(@Param('id') _id: string) {
    return this.boardsService.getBoardById(_id); 
  }

  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '게시판 글 수정'})
  @ApiTags('board')
  @Patch(':id')
  async updateBoard(
    @Param('uid') uid: string,
    @Req() req,
    @Body() updateBoardDto: UpdateBoardDto
  ) {
    return this.boardsService.updateBoard(uid, req.user, updateBoardDto);
  }
  
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '게시판 글 삭제'})
  @ApiTags('board')
  @Delete(':id')
  async deleteBoard(@Param('uid') uid: string, @Req() req) {
    this.boardsService.deleteBoard(uid, req.user);
  }
}