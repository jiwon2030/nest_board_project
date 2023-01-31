import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardFindBasicDTO, CreateBoardDTO, LoginUserCheckDTO, UpdateBoardDTO } from './dto/board.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { CommentFindBasicDTO } from 'src/comments/dto/comment.dto';

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
  async createBoard(@CurrentUser() user: LoginUserCheckDTO, @Body() board: CreateBoardDTO) {
      return await this.boardsService.createBoard(user, board);
  }

  @ApiOperation({ summary: '게시판 글 상세 페이지'})
  @ApiTags('board')
  @Get(':uid')
  async getBoardById(@Param('uid') uid) {
    return await this.boardsService.getBoardById(uid); 
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시판 글 수정'})
  @ApiTags('board')
  @Patch(':uid')
  async updateBoard(
    @CurrentUser() user: LoginUserCheckDTO,
    @Param('uid') uid: BoardFindBasicDTO,    
    @Body() updateBoardDTO: UpdateBoardDTO
  ) {
    return await this.boardsService.updateBoard(user, uid, updateBoardDTO);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시판 글 삭제'})
  @ApiTags('board')
  @Delete(':uid')
  async deleteBoard(
    @CurrentUser() user: LoginUserCheckDTO,
    @Param('uid') uid: BoardFindBasicDTO
    ) {
    return await this.boardsService.deleteBoard(user, uid);
  }
}