import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
    IsNotEmpty,
    IsString,
    IsDate,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
    timestamps:true,
    collection: 'comments',
};

@Schema(options)
export class Comment extends Document {
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
        example: 'testcontent',
        description: 'content',
        required: true,
    })
    content: string;

    @IsNotEmpty()
    @IsDate()
    @Prop({
        required:true,
        default: new Date(),
        type: mongoose.Schema.Types.Date,
    })
    create_date: Date;

    @IsNotEmpty()
    @IsDate()
    @Prop({
        required:true,
        default: new Date(),
        type: mongoose.Schema.Types.Date,
    })
    update_date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);