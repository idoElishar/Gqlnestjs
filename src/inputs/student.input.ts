/* eslint-disable prettier/prettier */

import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';


@InputType()
export class Courseinput {
    @Field()
    @IsString()
    readonly name: string;
}
@InputType()
export class StudentInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @Field()
    @Length(10, 15)
    readonly phone: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @Field()
    @IsEmail()
    readonly email: string;

   
    @Field(() => [Courseinput])
    @IsArray()  // Add this validation
    readonly courses?: Courseinput[];

}
