import { User } from './../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import { Comment } from 'src/model/comments.model';
import { v1 as uuid_v1 } from 'uuid';
import { LoginUserCheckDTO, CommentFindBasicDTO, CreateCommentDTO, UpdateCommentDTO, BoardIDFindDTO } from './dto/comment.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { Board } from 'src/model/boards.model';

@Injectable()
export class CommentRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel?: Model<User>,
        @InjectModel(Board.name) private readonly boardModel?: Model<Board>,
        @InjectModel(Comment.name) private readonly commentModel?: Model<Comment>,
    ) { }
  
     // 사용자가 작성한 댓글 확인
     async commentVerify(loginUser: LoginUserCheckDTO, uid: CommentFindBasicDTO) {
         const findComment = await this.commentModel.findOne({ uid }).exec();
         console.log(findComment);
         const findUser = await this.userModel.findOne({ _id: loginUser._id }).exec();
 
         if(!findComment) {
             throw new NotFoundException("댓글을 찾을 수 없습니다.");
         }
         if(!findUser) {
             throw new ForbiddenException("사용자를 찾을 수 없습니다.");
         }
         if(findUser._id != findComment.userID) {
             throw new ForbiddenException("작성한 댓글이 아닙니다.");
         }
         return findComment;
     }
 
     // 댓글 등록
     async createComment(user: LoginUserCheckDTO, boardId: BoardIDFindDTO, data: CreateCommentDTO) {
         const loginUser = await this.userModel.findOne({ _id: user._id }).exec(); 
         console.log("loginUser:", loginUser);
         console.log(boardId);
         const board = await this.boardModel.findOne({ boardId }).exec();
         console.log("board:", board);
         
 
         if(!loginUser) {
             throw new ForbiddenException("권한이 없습니다.");
         }
         if(!board) {
            throw new NotFoundException("게시글이 존재하지 않습니다.");
         }
         else {           
             const uid = uuid_v1();
             const content = data.content;
             const userID = loginUser._id;
             const boardID = board.uid;
             const comment: CreateCommentDTO = { uid, userID, boardID, content };
 
             return this.commentModel.create(comment);    
         }                    
     }
 
     // 댓글 수정
     async updateComment(user: LoginUserCheckDTO, uid: CommentFindBasicDTO, updateCommentDTO: UpdateCommentDTO) {
         const loginUser = await this.userModel.findOne({ _id: user._id }).exec(); 
         //console.log("loginUser:", loginUser);
         console.log(uid);
         const comment = await this.commentVerify(loginUser, uid);
         console.log("comment:", comment);
 
         if(!comment) {
             throw new ForbiddenException();
         }
         else {
             comment.content = updateCommentDTO.content;
             return await comment.save();
         }      
     }
 
     // 댓글 삭제
     async deleteComment(user: LoginUserCheckDTO, uid: CommentFindBasicDTO) { 
         const loginUser = await this.userModel.findOne({ _id: user._id }).exec();
         const comment = await this.commentVerify(loginUser, uid);
         if(!comment) {
             throw new ForbiddenException();
         }
         else {
             await this.commentModel.deleteOne({ uid });
             return "댓글이 삭제되었습니다.";
         }        
     }
}
