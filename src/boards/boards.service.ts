import { Injectable } from '@nestjs/common';
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

  async updateBoard(user: LoginUserCheckDTO, _id: BoardFindBasicDTO, updateBoardDTO: UpdateBoardDTO) {
    return await this.boardRepository.updateBoard(user, _id, updateBoardDTO)
  }

  async deleteBoard(loginUser: LoginUserCheckDTO, _id: BoardFindBasicDTO) {
    return await this.boardRepository.deleteBoard(loginUser, _id)
  }
}

