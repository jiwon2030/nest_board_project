import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comments.repository';
import { BoardIDFindDTO, CommentFindBasicDTO, CreateCommentDTO, LoginUserCheckDTO, UpdateCommentDTO } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) { }

  async getAllComments() {
    return await this.commentRepository.getAllComments();
  }

  async createComment(loginUser: LoginUserCheckDTO, boardId: BoardIDFindDTO, data: CreateCommentDTO) {
    return await this.commentRepository.createComment(loginUser, boardId, data);
  }

  async updateComment(user: LoginUserCheckDTO, _id: CommentFindBasicDTO, updateCommentDTO: UpdateCommentDTO) {
    return await this.commentRepository.updateComment(user, _id, updateCommentDTO)
  }

  async deleteComment(loginUser: LoginUserCheckDTO, _id: CommentFindBasicDTO) {
    return await this.commentRepository.deleteComment(loginUser, _id)
  }
}
