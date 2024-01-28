/* eslint-disable prettier/prettier */

import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './interfaces/Student.interface';
import { StudentInput } from 'src/inputs/student.input';
import { JwtService } from '@nestjs/jwt';
// import { StudentInput } from 'src/inputs/student.input';
// import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private StudentModel: Model<Student>,
    private jwtService: JwtService, 
  ) {}
  async findAll(): Promise<Student[]> {
    return this.StudentModel.find().exec();
  }
  async findById(id: string): Promise<Student> {
    return this.StudentModel.findById(id).exec();
  }
  async findByName(name: string): Promise<Student[]> {
    return this.StudentModel.find({ name:name }).exec();
  }
  async create(createStudentDto: StudentInput): Promise<Student> {
    const createdStudent = new this.StudentModel(createStudentDto);
    return createdStudent.save();
  }
  async update(id: string, updateStudentDto: StudentInput): Promise<Student> {
    const updatedStudent = await this.StudentModel.findByIdAndUpdate(
      id,
      updateStudentDto,
      { new: true },
    );
    return updatedStudent;
  }
  async delete(id: string,headers?:{authorization:any}): Promise<boolean> {
    if(!headers) {
      throw new UnauthorizedException('Missing authorization header, please provide a valid token');
    }
    console.log(headers);
    const token = headers.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    const userId = decoded['sub'];
    if(userId!== id) {
      throw new UnauthorizedException('Unauthorized to delete this student, you are not the owner of this student');
    }
    const result = await this.StudentModel.findByIdAndDelete(id).exec();
    return result != null;
  }


  async loginStudent(email: string, password: string): Promise<any | null> {
    const student = await this.StudentModel.findOne({ email }).exec();
    if (!student) {
      throw new UnauthorizedException('פרטי המייל אינם נכונים');
    }
    if (student.password !== password) {
      throw new UnauthorizedException('פרטי הסיסמא אינם נכונים');
    }
    const payload = { email: student.email, sub: student.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
