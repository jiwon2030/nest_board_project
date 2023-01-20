import { User } from './../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import { Board } from 'src/model/boards.model';
import { v1 as uuid_v1 } from 'uuid';
import { UpdateBoardDTO, CreateBoardDTO, LoginUserCheckDTO, BoardFindBasicDTO } from './dto/board.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Board.name) private readonly boardModel: Model<Board>,
    ) { }

    // 게시판 글 전체 리스트 페이지
    async getAllBoards() { 
       return this.boardModel.find();
    }
 
    // 사용자가 작성한 게시판 확인
    private async boardVerify(_id: BoardFindBasicDTO, loginUser: LoginUserCheckDTO) {
        const findBoard = await this.boardModel.findOne({ _id });
        const findUser = await this.userModel.findOne({ id: loginUser._id });

        if(!findBoard) {
            throw new NotFoundException();
        }
        if(!findUser) {
            throw new ForbiddenException();
        }
        if(findBoard.userID != findUser.id) {
            throw new ForbiddenException();
        }
        return findBoard;
    }

    // 게시판 글 등록
    async createBoard(user: LoginUserCheckDTO, data: CreateBoardDTO) {
        const loginUser = await this.userModel.findOne({ _id: user._id }); 
        console.log(loginUser);

        if(!loginUser) {
            throw new ForbiddenException("권한이 없습니다.");
        }
        else {           
            const uid = uuid_v1();
            const title = data.title;
            const content = data.content;
            const userID = loginUser._id;
            const createdAt = new Date;
       
            const board: CreateBoardDTO = { uid, userID, title, content, createdAt };

            loginUser.boards.push(board);
            loginUser.save();
            return this.boardModel.create(board);    
        }                    
    }

    // 게시판 글 상세 페이지
    async getBoardById(_id: BoardFindBasicDTO) {
        const boardID = _id.uid;
        const board = await this.boardModel
        .findOne({ boardID })
        .select({ _id: 0, title: 1, content: 1 , userID: 1, craetedAt: 1 });
        if (board) {
            return board;
        }
        else {
            throw new NotFoundException();
        }
    }

    // 게시판 글 수정
    async updateBoard(_id: BoardFindBasicDTO, user: LoginUserCheckDTO, updateBoardDTO: UpdateBoardDTO) {
        const loginUser = await this.userModel.findOne({ _id: user._id }); 
        console.log("loginUser:", loginUser);
        const board = await this.boardVerify(_id, loginUser);
        console.log("board:", board);

        if(!board) {
            throw new ForbiddenException();
        }
        else {
            board.title = updateBoardDTO.title;
            board.content = updateBoardDTO.content;

            board.save();
            console.log(board);
            loginUser.boards.push(board);
            loginUser.save();
            console.log(loginUser);
            return board;
        }      
    }

    // 게시판 글 삭제
    async deleteBoard(_id: BoardFindBasicDTO, user: LoginUserCheckDTO) { 
        const loginUser = await this.userModel.findOne({ _id: user._id });
        const board = await this.boardVerify(_id, loginUser);
        console.log(board);
        if(!board) {
            throw new ForbiddenException();
        }
        else {
            return await this.boardModel.deleteOne({ uid: board._id });
        }        
    }
}
