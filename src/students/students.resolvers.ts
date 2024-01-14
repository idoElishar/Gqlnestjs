/* eslint-disable prettier/prettier */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentsService } from './Students.service';
import { StudentType } from 'src/dto/createstudent.dto';
import { StudentInput } from 'src/inputs/student.input';
import { RedisService } from 'src/redis/redis.service';

@Resolver()
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly redisService: RedisService, // הוסף את RedisService
  ) {}
  @Query(() => String)
  async hello() {
    return 'hello';
  }
  @Query(() => [StudentType])
  async Students() {
    return this.studentsService.findAll();
  }

  @Query(() => StudentType)
  async Student(@Args('id') id: string) {
    console.log('Fetching teacher from the service:', id);
    const student = await this.studentsService.findById(id);
    return student;
  }
  @Mutation(() => StudentType)
  async addStudent(@Args('createStudentInput') createStudentInput: StudentInput) {
    console.log('Adding new student:', createStudentInput);
    const newStudent = await this.studentsService.create(createStudentInput);
    return newStudent;
  }
  @Mutation(() => StudentType)
  async updateStudent(@Args('id') id: string, @Args('updateStudentInput') updateStudentInput: StudentInput) {
    const updatedStudent = await this.studentsService.update(id, updateStudentInput);
    return updatedStudent;
  }


}