import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/model/users.model';
import { Comment, CommentSchema } from 'src/model/comments.model';
import { CommentFindBasicDto } from './dto/comment.dto';
import { CommentRepository } from './comments.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentFindBasicDto, CommentRepository],
  exports: [CommentFindBasicDto, CommentRepository]
})
export class CommentsModule {}
