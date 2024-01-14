/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { CoursesResolver } from './Courses.resolvers';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './Courses.schema';
import { CoursesService } from './Courses.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
    JwtModule.register({ 
      secret: 'mySuperSecretKey', 
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [CoursesResolver, CoursesService,RedisService],
})
export class CoursesModule {}
