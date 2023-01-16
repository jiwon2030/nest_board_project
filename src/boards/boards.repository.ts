import { User } from './../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import { Board } from 'src/model/boards.model';
import { v1 as uuid_v1 } from 'uuid';
import { CommentRepository } from 'src/comments/comments.repository';
import { BoardFindBasicResDto, CreateBoardDto } from './dto/board.dto';


@Injectable()
export class BoardRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Board.name) private readonly boardModel: Model<Board>,
        private readonly commentRepository: CommentRepository,
    ) { }

    // 게시판 글 전체 리스트 페이지
    async getAllBoards() { 
        return await this.boardModel.find();
    }

    // 게시판 글 등록
    async createBoard(data: CreateBoardDto) {
        
        const uid = uuid_v1();
        const title = data.title;
        const content = data.content;
        const comments = data.comments;
        const createdAt = new Date;
        const updatedAt = new Date;
       
        const board: CreateBoardDto = { uid, title, content, comments, createdAt, updatedAt };
        
        return await this.boardModel.create(board);
    }

    // 게시판 글 상세 페이지
    async getBoardById(_id: string) { 
        const board = await this.boardModel.findOne({ uid: _id });
        return board;
    }

    // 게시판 글 수정
    async updateBoard(id: string) {
        const board = await this.getBoardById(id);

        const { _id, title, content, updatedAt } = board

        await this.boardModel.updateOne({ _id }, { title, content, updatedAt });
        board.save();

        return board;
    }

    // 게시판 글 삭제
    async deleteBoard(_id: string) { 
        return await this.boardModel.deleteOne({ uid: _id });
    }
}