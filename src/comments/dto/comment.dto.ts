import { PickType, ApiProperty } from '@nestjs/swagger';
import { User } from '../../model/users.model'
import { Comment } from '../../model/comments.model'

export class CommentFindBasicResDto extends PickType(User, [
    '_id',
    'nickname',
] as const) { }

export class CreateCommentDto {
    uid: string; // 랜덤 부여
    contents: string; // 내용
    createdAt: Date; // 작성 날짜
    updatedAt: Date; // 수정 날짜
}

export class DeleteCommentDto extends PickType(Comment, ['uid'] as const) { }