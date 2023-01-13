import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
    IsNotEmpty,
    IsString,
    IsArray,
    IsDate,
    IsBoolean,
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
    @IsString()
    @Prop({
        required: true,
    })
    token: string;

    
    @IsNotEmpty()
    @IsBoolean()
    @Prop({
        required: true,
    })
    isAuth: boolean;

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