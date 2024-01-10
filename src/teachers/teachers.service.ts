/* eslint-disable prettier/prettier */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {                                                                     Teacher } from './interfaces/teacher.interface';
import { TeacherInput } from 'src/inputs/teacher.inputs';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TeachersService {
  constructor(@InjectModel('Teacher') private TeacherModel: Model<Teacher>) {}
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
    return this.TeacherModel.findByIdAndUpdate(TeacherId, updateData, { new: true }).exec();
  }

    async delete(TeacherId: string): Promise<{ deleted: boolean }> {
    const result = await this.TeacherModel.deleteOne({ _id: TeacherId }).exec();
    return { deleted: result.deletedCount > 0 };
  }
  
  async login(email: string, password: string): Promise<Teacher> {
    const teacher = await this.TeacherModel.findOne({ email }).exec();
    
    if (!teacher) {
      throw new UnauthorizedException('פרטי ההתחברות אינם נכונים');
    }
  
    if (teacher.password !== password) {
      throw new UnauthorizedException('פרטי ההתחברות אינם נכונים');
    }

    return teacher; 
  }
  
}
