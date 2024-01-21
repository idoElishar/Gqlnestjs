/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

interface Lecture {
  title: string;
}

interface Exercise {
  title: string;
}

interface TopicCovered {
  topic: string;
}

export interface Course extends Document {
  readonly courseName: string;
  rating: { type: number, required: true},
  readonly description: string;
  readonly lectures: Lecture[];
  readonly exercises: Exercise[];
  readonly topicsCovered: TopicCovered[];
  readonly lecturer: string;
  readonly imageURL: string;
}
