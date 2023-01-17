import { User } from './../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { Board } from 'src/model/boards.model';
import { v1 as uuid_v1 } from 'uuid';
import { CommentRepository } from 'src/comments/comments.repository';
import { BoardFindBasicResDto, UpdateBoardDto, CreateBoardDto } from './dto/board.dto';
import { ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';


@Injectable()
export class BoardRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Board.name) private readonly boardModel: Model<Board>,
        private readonly commentRepository: CommentRepository,
        private jwtService: JwtService
    ) { }

    // 게시판 글 전체 리스트 페이지
    async getAllBoards() { 
       return this.boardModel.find();
    }

    // 사용자가 작성한 게시판 확인
    private async boardVerify(uid: string, loginUser: CreateBoardDto) {
        const findBoard = await this.boardModel.findOne({ uid });
        const findUser = await this.userModel.findOne({ id: loginUser.userID });

        if(!findBoard) {
            throw new NotFoundException();
        }
        if(!findUser) {
            throw new NotFoundException();
        }
        if(findBoard.id != findUser.id) {
            throw new NotFoundException();
        }
        return findBoard;
    }

    // 게시판 글 등록
    async createBoard(loginUser: { id: any; }, data: CreateBoardDto) {
        const findUser = await this.userModel.findOne({ id: loginUser.id });

        if(!findUser) {
            throw new NotFoundException();
        }
        
        const uid = uuid_v1();
        const title = data.title;
        const content = data.content;
        const comments = data.comments;
        const userID = findUser.id;
        const createdAt = new Date;
        const updatedAt = new Date;
       
        const board: CreateBoardDto = { uid, userID, title, content, comments, createdAt, updatedAt };
        
        return await this.boardModel.create(board);
    }

    // 게시판 글 상세 페이지
    async getBoardById(_id: string) { 
        const board = await this.boardModel.findOne({ uid: _id });
        return board;
    }

    // 게시판 글 수정
    async updateBoard(uid: string, loginUser: CreateBoardDto, updateBoardDto: UpdateBoardDto) {
        const board = await this.boardVerify(uid, loginUser);

        board.title = updateBoardDto.title;
        board.content = updateBoardDto.content;

        board.save();
        return board;
    }

    // 게시판 글 삭제
    async deleteBoard(_id: string, loginUser: CreateBoardDto) { 
        const board = await this.boardVerify(_id, loginUser);
        return await this.boardModel.deleteOne({ uid: board._id });
    }
}