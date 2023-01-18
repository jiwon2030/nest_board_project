import { PickType } from '@nestjs/swagger';
import { User } from '../../model/users.model'
import { Board } from '../../model/boards.model'

export class BoardFindBasicDto extends PickType(User, [
    'id',
    'nickname',
] as const) { }

export class CreateBoardDto {
    uid: string; // 랜덤 부여
    userID: string; // 게시글 작성자 id
    title: string; // 제목
    content: string; // 내용
    createdAt: Date; // 작성 날짜
    updatedAt: Date; // 수정 날짜
}

export class UpdateBoardDto extends PickType(Board, ['title', 'content', 'updatedAt'] as const) { }
