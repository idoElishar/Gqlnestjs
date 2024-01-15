/* eslint-disable prettier/prettier */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './interfaces/teacher.interface';
import { TeacherInput } from 'src/inputs/teacher.inputs';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // ייבוא JwtService
// import { LoginGuard } from 'src/guards/loginStudent.guards';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel('Teacher') private TeacherModel: Model<Teacher>,
    private jwtService: JwtService, // הוספת JwtService כתלות
  ) {}

  async create(createTeacherDto: TeacherInput): Promise<Teacher> {
    const createdTeacher = new this.TeacherModel(createTeacherDto);
    return createdTeacher.save();
  }

  async findAll(): Promise<Teacher[]> {
    return this.TeacherModel.find().exec();
  }

  async findById(TeacherId: string): Promise<Teacher> {
    return this.TeacherModel.findById(TeacherId).exec();
  }
  async update(TeacherId: string, updateData: TeacherInput): Promise<Teacher> {
    return this.TeacherModel.findByIdAndUpdate(TeacherId, updateData, {
      new: true,
    }).exec();
  }

  async delete(TeacherId: string, headers?: { authorization: any }): Promise<boolean> {
    if (!headers) {
      throw new UnauthorizedException('Missing authorization header, please provide a valid token');
    }
  
    
    const token = headers.authorization.split(' ')[1]; 
    const decoded = this.jwtService.verify(token);
//   רק המורה שהתחבר יכול למחוק
    const userId = decoded['sub'];
  
    if (userId !== TeacherId) {
      throw new UnauthorizedException('Unauthorized to delete this teacher, you are not the owner of this teacher');
    }
  
    const result = await this.TeacherModel.deleteOne({ _id: TeacherId }).exec();
    return result.deletedCount > 0;
  }

  async login(email: string, password: string): Promise<any> {
    const teacher = await this.TeacherModel.findOne({ email }).exec();
    console.log('teacher ' + teacher);

    if (!teacher) {
      throw new UnauthorizedException('פרטי ההתחברות אינם נכונים');
    }

    if (teacher.password !== password) {
      throw new UnauthorizedException('פרטי הסיסמא אינם נכונים');
    }

    const payload = { email: teacher.email, sub: teacher.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
