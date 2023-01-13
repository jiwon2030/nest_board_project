import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from 'src/model/boards.model'
import { BoardFindBasicResDto, CreateBoardDto, BoardCommentDto, deleteBoardDto } from './dto/board.dto';
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
  async createBoard(@Body() board: CreateBoardDto) {
      return this.boardsService.createBoard(board);
  }

  @ApiOperation({ summary: '게시판 글 상세 페이지'})
  @ApiTags('board')
  @Get('/:id')
  async getBoardById(@Param('id') id: string) {
    return this.boardsService.getBoardById(id); 
  }

  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '게시판 글 수정'})
  @ApiTags('board')
  @Patch('/:id/contents')
  async updateBoard(
    @Param('id') id: string,
    @Body('contents') contents: string
  ) {
    return this.boardsService.updateBoard(id, contents);
  }
  
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '게시판 글 삭제'})
  @ApiTags('board')
  @Delete('/:id')
  async deleteBoard(@Param('id') id: string) {
    this.boardsService.deleteBoard(id);
  }
}