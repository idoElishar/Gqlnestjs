/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { StudentsResolver } from './students.resolvers';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './students.schema';
import { StudentsService } from './Students.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    JwtModule.register({ 
      secret: 'mySuperSecretKey', 
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [StudentsResolver, StudentsService,RedisService],
})
export class StudentsModule {}
