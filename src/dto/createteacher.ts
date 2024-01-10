/* eslint-disable prettier/prettier */

import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TeacherType {
    @Field(()=>ID)
    readonly id: string;
    @Field()
    readonly name: string;  
    @Field()
    readonly phone: string;
    @Field()
    readonly address: string;
    @Field()
    readonly email: string;
    @Field()
    readonly course: string; 
    @Field()
    readonly images: string;
    @Field()
    readonly password: string;
  }

  