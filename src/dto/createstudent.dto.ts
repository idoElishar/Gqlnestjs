/* eslint-disable prettier/prettier */

import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StudentType {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly phone: string;
  @Field()
  readonly address: string;
  @Field()
  readonly email: string;
  @Field(()=>[Course])
  readonly courses?: Course[] ;
}


@ObjectType()
export class Course {
  @Field()
  readonly name: string;
}
