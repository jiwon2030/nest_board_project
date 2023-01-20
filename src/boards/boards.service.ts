import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginUserCheckDTO, CreateBoardDTO, UpdateBoardDTO, BoardFindBasicDTO } from './dto/board.dto'
import { BoardRepository } from './boards.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) { }

  async getAllBoards() {
    return await this.boardRepository.getAllBoards();
  }

  async createBoard(loginUser: LoginUserCheckDTO, data: CreateBoardDTO) {
    return await this.boardRepository.createBoard(loginUser, data);
  }

  async getBoardById(_id: BoardFindBasicDTO) {
    return await this.boardRepository.getBoardById(_id);
  }

  async updateBoard(_id: BoardFindBasicDTO, user: LoginUserCheckDTO, updateBoardDTO: UpdateBoardDTO) {
    return await this.boardRepository.updateBoard(_id, user, updateBoardDTO)
  }

  async deleteBoard(_id: BoardFindBasicDTO, loginUser: LoginUserCheckDTO) {
    return await this.boardRepository.deleteBoard(_id, loginUser)
  }
}

