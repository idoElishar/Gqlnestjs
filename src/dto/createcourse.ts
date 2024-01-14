/* eslint-disable prettier/prettier */

import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CourseType {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly courseName: string;

  @Field()
  readonly description: string;

  @Field(() => [Lecture])
  readonly lectures: Lecture[];

  @Field(() => [Exercise])
  readonly exercises: Exercise[];

  @Field()
  readonly lecturer: string;

  @Field()
  readonly imageURL: string;

  @Field(() => [TopicCovered])
  readonly topicsCovered: TopicCovered[];
}

@ObjectType()
export class Lecture {
  @Field()
  readonly title: string;
}

@ObjectType()
export class Exercise {
  @Field()
  readonly title: string;
}

@ObjectType()
export class TopicCovered {
  @Field()
  readonly topic: string;

  
}
