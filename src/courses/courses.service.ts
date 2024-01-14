/* eslint-disable prettier/prettier */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './interface/course.interface';
import { CourseInput } from 'src/inputs/course.input';
// import { CourseInput } from 'src/inputs/Course.input';


@Injectable()
export class CoursesService {
    constructor(
        @InjectModel('Course') private CourseModel: Model<Course>,
    ) { }
    async findAll(): Promise<Course[]> {
        return this.CourseModel.find().exec();
    }
    async findCourseById(id: string): Promise<Course> {
        return this.CourseModel.findById(id).exec();
      }
      async updateCourse(id: string, updateStudentDto: CourseInput): Promise<Course> {
        const updatedStudent = await this.CourseModel.findByIdAndUpdate(id, updateStudentDto, { new: true });
        return updatedStudent;
      }
      async createCourse(createStudentDto: CourseInput): Promise<Course> {
        const createdStudent = new this.CourseModel(createStudentDto);
        return createdStudent.save();
      }
}