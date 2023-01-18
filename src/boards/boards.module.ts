import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/model/users.model';
import { Board, BoardSchema } from 'src/model/boards.model';
import { BoardFindBasicDto } from './dto/board.dto';
import { BoardRepository } from './boards.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Board.name, schema: BoardSchema }]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardFindBasicDto, BoardRepository],
  exports: [BoardFindBasicDto, BoardRepository]
})
export class BoardsModule {}
