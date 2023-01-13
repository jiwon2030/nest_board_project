import { PickType, ApiProperty } from '@nestjs/swagger';
import { User } from '../../model/users.model'
import { Board } from '../../model/boards.model'

export class BoardFindBasicResDto extends PickType(User, [
    '_id',
    'nickname',
] as const) { }

export class CreateBoardDto {
    uid: string; // 랜덤 부여
    title: string; // 제목
    content: string; // 내용
    comments: Array<BoardCommentDto>; // 댓글
    createdAt: Date; // 작성 날짜
    updatedAt: Date; // 수정 날짜
}

export class BoardCommentDto {
    uid: string;
    content: string;
}

export class deleteBoardDto extends PickType(Board, ['uid'] as const) { }