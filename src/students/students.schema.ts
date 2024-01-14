/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: String
});

const StudentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  email: String,
  courses: [CourseSchema]
}, { versionKey: false });

export { StudentSchema, CourseSchema};