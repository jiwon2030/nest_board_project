import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardFindBasicResDto, createBoardDto, BoardCommentDto, deleteBoardDto } from './dto/board.dto'
import { BoardRepository } from './boards.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) { }

  async getAllBoards() {
    
  }

  async createBoard(board) {
    return await this.boardRepository.createBoard(board);
  }

  async getBoardById() {
    
  }

  async updateBoard() {
    
  }

  async deleteBoard() {
    
  }
}

