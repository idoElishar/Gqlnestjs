/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { TeachersResolver } from './Teachers.resolvers';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './teachers.schema';
import { TeachersService } from './Teachers.service';

@Module({
    imports:[MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }])],
  providers: [TeachersResolver,TeachersService],
})
export class TeachersModule {}
