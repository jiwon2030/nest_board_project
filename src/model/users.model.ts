import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
    IsNotEmpty,
    IsString,
    IsDate,
    Length,
    Matches,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

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

    @IsNotEmpty()
    @IsString()
    @Prop({
        required: true,
    })
    salt: string;

}

export const UserSchema = SchemaFactory.createForClass(User);