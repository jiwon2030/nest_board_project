import { Injectable } from '@nestjs/common';
import { LoginUserCheckDTO, CreateBoardDTO, UpdateBoardDTO, BoardFindBasicDTO } from './dto/board.dto'
import { BoardRepository } from './boards.repository';
import { CommentFindBasicDTO } from 'src/comments/dto/comment.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) { }

  async getAllBoards() {
    return await this.boardRepository.getAllBoards();
  }

  async createBoard(loginUser: LoginUserCheckDTO, data: CreateBoardDTO) {
    return await this.boardRepository.createBoard(loginUser, data);
  }

  async getBoardById(uid: BoardFindBasicDTO) {
    return await this.boardRepository.getBoardById(uid);
  }

  async updateBoard(user: LoginUserCheckDTO, uid: BoardFindBasicDTO, updateBoardDTO: UpdateBoardDTO) {
    return await this.boardRepository.updateBoard(user, uid, updateBoardDTO)
  }

  async deleteBoard(loginUser: LoginUserCheckDTO, uid: BoardFindBasicDTO) {
    return await this.boardRepository.deleteBoard(loginUser, uid)
  }
}

