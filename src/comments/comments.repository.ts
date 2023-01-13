import { User } from './../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import { Comment } from 'src/model/comments.model';
import { v1 as uuid_v1 } from 'uuid';

@Injectable()
export class CommentRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    ) { }

    async 
}