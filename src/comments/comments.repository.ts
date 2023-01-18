import { User } from './../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import { Comment } from 'src/model/comments.model';
import { v1 as uuid_v1 } from 'uuid';
import { CommentFindBasicDto, UpdateCommentDto, CreateCommentDto } from './dto/comment.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class CommentRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    ) { }

    // 댓글 전체 리스트 페이지
    async getAllComments() { 
       return this.commentModel.find();
    }
 
    // 사용자가 작성한 댓글 확인
    private async commentVerify(uid: string, loginUser: CreateCommentDto) {
        const findComment = await this.commentModel.findOne({ uid });
        const findUser = await this.userModel.findOne({ id: loginUser.userID });

        if(!findComment) {
            throw new NotFoundException();
        }
        if(!findUser) {
            throw new ForbiddenException();
        }
        if(findComment.id != findUser.id) {
            throw new ForbiddenException();
        }
        return findComment;
    }

    // 댓글 등록
    async createComment(user: CommentFindBasicDto, data: CreateCommentDto) {
        const loginUser = await this.userModel.findOne({ id: user.id });

        if(!loginUser) {
            throw new ForbiddenException();
        }
        
        const uid = uuid_v1();
        const content = data.content;
        const userID = loginUser.id;
        const createdAt = new Date;
        const updatedAt = new Date;
       
        const comment: CreateCommentDto = { uid, userID, content, createdAt, updatedAt };
        
        return await this.commentModel.create(comment);
    }

    // 댓글 수정
    async updateComment(uid: string, loginUser: CreateCommentDto, updateCommentDto: UpdateCommentDto) {
        const comment = await this.commentVerify(uid, loginUser);

        comment.content = updateCommentDto.content;
        comment.updatedAt = updateCommentDto.updatedAt;

        comment.save();
        return comment;
    }

    // 댓글 삭제
    async deleteComment(_id: string, loginUser: CreateCommentDto) { 
        const comment = await this.commentVerify(_id, loginUser);
        return await this.commentModel.deleteOne({ uid: comment._id });
    }
}
