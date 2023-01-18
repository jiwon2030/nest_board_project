import { PickType } from '@nestjs/swagger';
import { User } from '../../model/users.model'
import { Comment } from '../../model/comments.model'

export class CommentFindBasicDto extends PickType(User, [
    'id',
    'nickname',
] as const) { }

export class CreateCommentDto {
    uid: string; // 랜덤 부여
    userID: string; // 댓글 작성자 id
    content: string; // 내용
    createdAt: Date; // 작성 날짜
    updatedAt: Date; // 수정 날짜
}

export class UpdateCommentDto extends PickType(Comment, [ 'content', 'updatedAt'] as const) { }