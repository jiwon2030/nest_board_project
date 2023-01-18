import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '댓글 리스트 조회'})
  @ApiTags('comment')
  @Get('/')
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 등록'})
  @ApiTags('comment')
  @Post()
  async createComment(@Req() req, @Body() comment: CreateCommentDto) {
      return this.commentsService.createComment(req.user, comment);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 수정'})
  @ApiTags('comment')
  @Patch(':id')
  async updateComment(
    @Param('uid') uid: string,
    @Req() req,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    return this.commentsService.updateComment(uid, req.user, updateCommentDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 삭제'})
  @ApiTags('comment')
  @Delete(':id')
  async deleteComment(@Param('uid') uid: string, @Req() req) {
    this.commentsService.deleteComment(uid, req.user);
  }
}
