/* eslint-disable prettier/prettier */

import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CatType {
    @Field(()=>ID)
    readonly id: string;
    @Field()
    readonly name: string;
    @Field(()=>Int)
    readonly age: number;
    @Field()
    readonly breed: string;
  }