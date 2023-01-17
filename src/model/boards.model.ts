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
    uid: string;

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
    userID: string;

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
    title: string;

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
    content: string;

    @IsArray()
    @Prop({
        default: [],
    })
    comments: Array<CreateCommentDto>;

    @IsNotEmpty()
    @IsDate()
    @Prop({
        required:true,
        default: new Date(),
        type: mongoose.Schema.Types.Date,
    })
    createdAt: Date;

    @IsNotEmpty()
    @IsDate()
    @Prop({
        required:true,
        default: new Date(),
        type: mongoose.Schema.Types.Date,
    })
    updatedAt: Date;
}

export const BoardSchema = SchemaFactory.createForClass(Board);