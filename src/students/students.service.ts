/* eslint-disable prettier/prettier */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './interfaces/Student.interface';
import { StudentInput } from 'src/inputs/student.input';
// import { StudentInput } from 'src/inputs/student.input';
// import { UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt'; // ייבוא JwtService

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private StudentModel: Model<Student>,
    // private jwtService: JwtService // הוספת JwtService כתלות
  ) { }
  async findAll(): Promise<Student[]> {
    return this.StudentModel.find().exec();
  }
  async findById(id: string): Promise<Student> {
    return this.StudentModel.findById(id).exec();
  }
  async create(createStudentDto: StudentInput): Promise<Student> {
    const createdStudent = new this.StudentModel(createStudentDto);
    return createdStudent.save();
  }
  async update(id: string, updateStudentDto: StudentInput): Promise<Student> {
    const updatedStudent = await this.StudentModel.findByIdAndUpdate(id, updateStudentDto, { new: true });
    return updatedStudent;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.StudentModel.findByIdAndDelete(id).exec();
    return result != null;
  }
  async loginStudent(email: string, password: string): Promise<Student | null> {
    const student = await this.StudentModel.findOne({ email }).exec();
    if (student && student.password === password) {
      return student;
    }
    return null;
  }
}