import { PickType } from '@nestjs/swagger';
import { User } from '../../model/users.model'
import { Comment } from '../../model/comments.model'
import { Board } from 'src/model/boards.model';

export class LoginUserCheckDTO extends PickType(User, ['_id'] as const) { 
    _id!: string;
}

export class BoardIDFindDTO extends PickType(Board, ['_id'] as const) {
    _id!: string;
}

export class CreateCommentDTO {
    uid!: string; // 랜덤 부여
    boardID!: string; // 해당 게시판 id
    userID!: string; // 댓글 작성자 id
    content!: string; // 내용
}

export class CommentFindBasicDTO extends PickType(Comment, [
    '_id',
    'content',
    'userID',
] as const) {
    uid!: string;
 }

export class UpdateCommentDTO extends PickType(Comment, ['content'] as const) { }