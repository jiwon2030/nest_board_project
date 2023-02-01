import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comments.repository';
import { BoardIDFindDTO, CommentFindBasicDTO, CreateCommentDTO, LoginUserCheckDTO, UpdateCommentDTO } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) { }

  async createComment(loginUser: LoginUserCheckDTO, boardId: BoardIDFindDTO, data: CreateCommentDTO) {
    return await this.commentRepository.createComment(loginUser, boardId, data);
  }

  async updateComment(user: LoginUserCheckDTO, uid: CommentFindBasicDTO, updateCommentDTO: UpdateCommentDTO) {
    return await this.commentRepository.updateComment(user, uid, updateCommentDTO)
  }

  async deleteComment(loginUser: LoginUserCheckDTO, uid: CommentFindBasicDTO) {
    return await this.commentRepository.deleteComment(loginUser, uid)
  }
}
