import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardFindBasicDto, CreateBoardDto, UpdateBoardDto } from './dto/board.dto'
import { BoardRepository } from './boards.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) { }

  async getAllBoards() {
    return await this.boardRepository.getAllBoards();
  }

  async createBoard(loginUser: BoardFindBasicDto, data: CreateBoardDto) {
    return await this.boardRepository.createBoard(loginUser, data);
  }

  async getBoardById(uid: CreateBoardDto) {
    return await this.boardRepository.getBoardById(uid);
  }

  async updateBoard(uid: string, loginUser: CreateBoardDto, updateBoardDto: UpdateBoardDto) {
    return await this.boardRepository.updateBoard(uid, loginUser, updateBoardDto)
  }

  async deleteBoard(_id: string, loginUser: CreateBoardDto) {
    return await this.boardRepository.deleteBoard(_id, loginUser)
  }
}

