/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { TeachersResolver } from './Teachers.resolvers';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './teachers.schema';
import { TeachersService } from './Teachers.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
    JwtModule.register({ 
      secret: 'mySuperSecretKey', 
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [TeachersResolver, TeachersService],
})
export class TeachersModule {}
