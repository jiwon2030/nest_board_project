import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
    IsNotEmpty,
    IsString,
    IsArray,
    IsDate,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/comments/dto/comment.dto';

const options: SchemaOptions = {
    timestamps:true,
    collection: 'boards',
};

@Schema(options)
export class Board extends Document {
    @IsNotEmpty()
    @IsString()
    @Prop({
        required: true,
        unique: true,
    })
    @ApiProperty({
        example: 'testuid',
        description: 'uid',
        required: true,
    })
    uid: string; // 게시판 고유 id

    @IsNotEmpty()
    @IsString()
    @Prop({
        required: true,
    })
    @ApiProperty({
        example: 'testuserID',
        description: 'userID',
        required: true,
    })
    userID: string; // 작성자 id

    @IsNotEmpty()
    @IsString()
    @Prop({
        required: true,
    })
    @ApiProperty({
        example: 'testtitle',
        description: 'title',
        required: true,
    })
    title: string; // 제목

    @IsNotEmpty()
    @IsString()
    @Prop({
        required: true,
    })
    @ApiProperty({
        example: 'testcontent',
        description: 'content',
        required: true,
    })
    content: string; // 내용

    @IsArray()
    @Prop({
        default: [],
    })
    comments: Array<CreateCommentDto>; // 댓글

    @IsNotEmpty()
    @IsDate()
    @Prop({
        default: new Date(),
        type: mongoose.Schema.Types.Date,
    })
    createdAt: Date; // 작성 날짜

    @IsNotEmpty()
    @IsDate()
    @Prop({
        default: new Date(),
        type: mongoose.Schema.Types.Date,
    })
    updatedAt: Date; // 수정 날짜
}

export const BoardSchema = SchemaFactory.createForClass(Board);