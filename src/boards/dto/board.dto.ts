import { PickType } from '@nestjs/swagger';
import { User } from '../../model/users.model'
import { Board } from '../../model/boards.model'

export class LoginUserCheckDTO extends PickType(User, ['_id'] as const) { 
    _id: string;
}

export class CreateBoardDTO {
    uid: string; // 랜덤 부여
    userID: string; // 게시글 작성자 id
    title: string; // 제목
    content: string; // 내용
}

export class BoardFindBasicDTO extends PickType (Board, [
    'uid',
    'title',
    'content',
    'userID',
] as const) {
    uid: string;
}

export class UpdateBoardDTO extends PickType(Board, ['title', 'content'] as const) { }
