import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardFindBasicResDto, CreateBoardDto, UpdateBoardDto, BoardCommentDto, DeleteBoardDto } from './dto/board.dto'
import { BoardRepository } from './boards.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) { }

  async getAllBoards() {
    return await this.boardRepository.getAllBoards();
  }

  async createBoard(loginUser, data: CreateBoardDto) {
    return await this.boardRepository.createBoard(loginUser, data);
  }

  async getBoardById(_id: string) {
    return await this.boardRepository.getBoardById(_id);
  }

  async updateBoard(uid: string, loginUser, updateBoardDto: UpdateBoardDto) {
    return await this.boardRepository.updateBoard(uid, loginUser, updateBoardDto)
  }

  async deleteBoard(_id: string, loginUser) {
    return await this.boardRepository.deleteBoard(_id, loginUser)
  }
}

