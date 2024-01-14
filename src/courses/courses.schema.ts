/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';

const LectureSchema = new mongoose.Schema({
title: String,
});

const ExerciseSchema = new mongoose.Schema({
title: String,
});

const TopicCoveredSchema = new mongoose.Schema({
topic:String
});

const CourseSchema = new mongoose.Schema({
courseName: { type: String, required: true },
description: String,
lectures: [LectureSchema],
exercises: [ExerciseSchema],
topicsCovered: [TopicCoveredSchema],
lecturer: String,
imageURL: String,
}, { versionKey: false });

export { CourseSchema };