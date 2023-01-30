import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/model/users.model';
import { Comment, CommentSchema } from 'src/model/comments.model';
import { BoardIDFindDTO, LoginUserCheckDTO } from './dto/comment.dto';
import { CommentRepository } from './comments.repository';
import { Board, BoardSchema } from 'src/model/boards.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, 
      { name: Board.name, schema: BoardSchema },
      { name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, BoardIDFindDTO, LoginUserCheckDTO, CommentRepository],
  exports: [LoginUserCheckDTO, BoardIDFindDTO, CommentRepository]
})
export class CommentsModule {}
