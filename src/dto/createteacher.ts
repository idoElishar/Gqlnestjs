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

  @ObjectType()
class Teacher {
  @Field()
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly email: string;

  @Field()
  readonly course: string;

  @Field()
  readonly address: string;

  @Field()
  readonly phone: string;

  @Field({ nullable: true })
  readonly images?: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  readonly access_token: string;

  @Field(() => Teacher)
  readonly teacher: Teacher;
}


@ObjectType()
export class StudentType1 {
  @Field()
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly phone: string;

  @Field()
  readonly address: string;

  @Field()
  readonly email: string;

  @Field(() => [Course1])
  readonly courses: Course1[];

  @Field()
  readonly password: string;
}
@ObjectType()
export class LoginStudentResponse {
  @Field()
  readonly access_token: string;

  @Field(() => StudentType1)
  readonly student: StudentType1;
}

@ObjectType()
export class Course1 {
  @Field()
  readonly name: string;
}