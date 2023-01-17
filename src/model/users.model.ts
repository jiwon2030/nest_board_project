import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
    IsNotEmpty,
    IsString,
    IsArray,
    IsDate,
    IsBoolean,
    Length,
    Matches,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { CreateBoardDto } from 'src/boards/dto/board.dto';

const options: SchemaOptions = {
    timestamps:true,
    collection: 'users',
};

@Schema(options)
export class User extends Document {
    @IsNotEmpty()
    @IsString()
    @Length(6-12)
    @Prop({
        required: true,
        unique: true,
    })
    @ApiProperty({
        example: 'testid',
        description: 'id',
        required: true,
    })
    id: string;

    @IsNotEmpty()
    @IsString()
    @Length(8-16)
    @Matches(
        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]){8,16}$/,
        {
          message: '비밀번호 양식에 맞게 작성하세요.',
        },
      )
    @Prop({
        required: true,
    })
    @ApiProperty({
        example: 'asdf1234',
        description: 'password',
        required: true,
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    @Prop({
        required: true,
    })
    @ApiProperty({
        example: 'testnickname',
        description: 'nickname',
        required: true,
    })
    nickname: string;

    @IsArray()
    @Prop({
        default: [],
    })
    boards: Array<CreateBoardDto>;

    @IsNotEmpty()
    @IsString()
    @Prop({
        required: true,
    })
    salt: string;

    @IsNotEmpty()
    @IsDate()
    @Prop({
        required:true,
        default: new Date(),
        type: mongoose.Schema.Types.Date,
    })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);