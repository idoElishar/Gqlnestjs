/* eslint-disable prettier/prettier */

import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TeacherInput {
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
  }

