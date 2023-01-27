import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/model/users.model';
import { Board, BoardSchema } from 'src/model/boards.model';
import { LoginUserCheckDTO } from './dto/board.dto';
import { BoardRepository } from './boards.repository';
import { Comment, CommentSchema } from 'src/model/comments.model';
import { CommentRepository } from 'src/comments/comments.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, 
      { name: Board.name, schema: BoardSchema },
      { name: Comment.name, schema: CommentSchema }
    ]),
  ],
  controllers: [BoardsController],
  providers: [LoginUserCheckDTO, BoardsService, BoardRepository, CommentRepository],
  exports: [LoginUserCheckDTO, BoardRepository]
})
export class BoardsModule {}
