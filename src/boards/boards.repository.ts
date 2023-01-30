import { User } from './../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import { Board } from 'src/model/boards.model';
import { v1 as uuid_v1 } from 'uuid';
import { UpdateBoardDTO, CreateBoardDTO, LoginUserCheckDTO, BoardFindBasicDTO } from './dto/board.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { CommentRepository } from 'src/comments/comments.repository';
import { CommentFindBasicDTO } from 'src/comments/dto/comment.dto';
import { Comment } from 'src/model/comments.model';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Board.name) private readonly boardModel: Model<Board>,
        @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    ) { }

    // 게시판 글 전체 리스트 페이지
    async getAllBoards() { 
       return this.boardModel.find();
    }
 
    // 사용자가 작성한 게시판 확인
    async boardVerify(loginUser: LoginUserCheckDTO, uid: BoardFindBasicDTO) {
        const findBoard = await this.boardModel.findOne({ uid }).exec();
        console.log(findBoard);
        const findUser = await this.userModel.findOne({ _id: loginUser._id }).exec();

        if(!findBoard) {
            throw new NotFoundException("게시글을 찾을 수 없습니다.");
        }
        if(!findUser) {
            throw new ForbiddenException("사용자를 찾을 수 없습니다.");
        }
        if(findUser._id != findBoard.userID) {
            throw new ForbiddenException("작성한 게시글이 아닙니다.");
        }
        return findBoard;
    }

    // 게시판 글 등록
    async createBoard(user: LoginUserCheckDTO, data: CreateBoardDTO) {
        const loginUser = await this.userModel.findOne({ _id: user._id }).exec(); 
        console.log("loginUser:", loginUser);

        if(!loginUser) {
            throw new ForbiddenException("권한이 없습니다.");
        }
        else {           
            const uid = uuid_v1();
            const title = data.title;
            const content = data.content;
            const userID = loginUser._id;   
            const board: CreateBoardDTO = { uid, userID, title, content };

            return this.boardModel.create(board);    
        }                    
    }

    // 게시판 글 상세 페이지
    async getBoardById(uid) {
        console.log(uid);
        const boardID = uid.id;
        const board = await this.boardModel
        .findOne({ _id: boardID })
        .select({ _id: 0, title: 1, content: 1 , userID: 1 });
        
        const board_title = board.title;
        const board_content = board.content;
        const board_userID = board.userID;
        const board_comment = await this.commentModel.find().where({ boardID: uid.id });

        const board_info = { board_title, board_content, board_userID, board_comment }

        if (board) {
            return board_info;
        }
        else {
            throw new NotFoundException();
        }
    }

    // 게시판 글 수정
    async updateBoard(user: LoginUserCheckDTO, uid: BoardFindBasicDTO, updateBoardDTO: UpdateBoardDTO) {
        const loginUser = await this.userModel.findOne({ _id: user._id }).exec(); 
        console.log("loginUser:", loginUser);
        const board = await this.boardVerify(loginUser, uid);
        console.log("board:", board);

        if(!board) {
            throw new ForbiddenException();
        }
        else {
            board.title = updateBoardDTO.title;
            board.content = updateBoardDTO.content;
            return await board.save();
        }      
    }

    // 게시판 글 삭제
    async deleteBoard(user: LoginUserCheckDTO, uid: BoardFindBasicDTO) { 
        const loginUser = await this.userModel.findOne({ _id: user._id }).exec();
        console.log("loginUser:", loginUser);
        const board = await this.boardVerify(loginUser, uid);
        console.log("board:", board);
        if(!board) {
            throw new ForbiddenException();
        }
        else {
            await this.boardModel.deleteOne({ uid });
            await this.commentModel.deleteMany({ boardID: uid });
            // if (board.uid == this.commentModel.boardID) {
            //     await this.commentModel.deleteOne({ uid });
            //     return 
            // }
            return "게시판이 삭제되었습니다.";
        }        
    }
}
