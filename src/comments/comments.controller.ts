import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { BoardIDFindDTO, CommentFindBasicDTO, CreateCommentDTO, LoginUserCheckDTO, UpdateCommentDTO } from './dto/comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @ApiOperation({ summary: '댓글 전체 페이지 조회'})
  @ApiTags('comment')
  @Get('/')
  async getAllComment() {
    return await this.commentsService.getAllComments();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 등록'})
  @ApiTags('comment')
  @Post('/create/:uid')
  async createComment(
    @CurrentUser() user: LoginUserCheckDTO,    
    @Param('uid') boardId: BoardIDFindDTO, 
    @Body() comment: CreateCommentDTO) {
      return await this.commentsService.createComment(user, boardId, comment);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 수정'})
  @ApiTags('comment')
  @Patch('/:uid')
  async updateComment(
    @CurrentUser() user: LoginUserCheckDTO,
    @Param('uid') uid: CommentFindBasicDTO,    
    @Body() updateCommentDTO: UpdateCommentDTO
  ) {
    return await this.commentsService.updateComment(user, uid, updateCommentDTO);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 삭제'})
  @ApiTags('comment')
  @Delete('/:uid')
  async deleteComment(
    @CurrentUser() user: LoginUserCheckDTO,
    @Param('uid') uid: CommentFindBasicDTO,
    ) {
    return await this.commentsService.deleteComment(user, uid);
  }
}