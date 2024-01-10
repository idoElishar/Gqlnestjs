/* eslint-disable prettier/prettier */

import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';


@InputType()
export class TeacherInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @Field()
    @IsString()
    @Length(10, 15) // Assuming phone numbers are between 10 and 15 characters
    readonly phone: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @Field()
    @IsEmail()
    readonly email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    readonly course: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    readonly images: string;
}
