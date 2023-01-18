import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comments.repository';
import { CommentFindBasicDto, CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) { }

  async getAllComments() {
    return await this.commentRepository.getAllComments();
  }

  async createComment(loginUser: CommentFindBasicDto, data: CreateCommentDto) {
    return await this.commentRepository.createComment(loginUser, data);
  }

  async updateComment(uid: string, loginUser: CreateCommentDto, updateCommentDto: UpdateCommentDto) {
    return await this.commentRepository.updateComment(uid, loginUser, updateCommentDto)
  }

  async deleteComment(_id: string, loginUser: CreateCommentDto) {
    return await this.commentRepository.deleteComment(_id, loginUser)
  }
}
