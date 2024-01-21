/* eslint-disable prettier/prettier */

import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

@InputType()
export class LectureInput {
  @Field()
  @IsString()
  readonly title: string;
}

@InputType()
export class ExerciseInput {
  @Field()
  @IsString()
  readonly title: string;
}

@InputType()
export class TopicCoveredInput {
  @Field()
  @IsString()
  readonly topic: string;
}

@InputType()
export class CourseInput {

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly courseName: string;
  @Field()
  @IsNotEmpty()
  readonly rating: number;

  @Field()
  @IsString()
  readonly description: string;

  @Field(() => [LectureInput])
  @IsArray()
  readonly lectures: LectureInput[];

  @Field(() => [ExerciseInput])
  @IsArray()
  readonly exercises: ExerciseInput[];

  @Field(() => [TopicCoveredInput])
  @IsArray()
  readonly topicsCovered: TopicCoveredInput[];

  @Field()
  @IsString()
  readonly lecturer: string;

  @Field()
  @IsUrl()
  readonly imageURL: string;
}
