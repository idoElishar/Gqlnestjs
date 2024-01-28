/* eslint-disable prettier/prettier */

import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentsService } from './Students.service';
import { StudentType } from '../dto/createstudent.dto';

import { LoginInput, StudentInput } from '../inputs/student.input';
import { RedisService } from '../redis/redis.service';
import { LoginResponse } from '../dto/createteacher';

@Resolver()
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly redisService: RedisService, 
  ) {}
  @Query(() => String)
  async hello() {
    return 'hello';
  }
  @Query(() => [StudentType])
  async findAllStudents() {
    const cachedUsers = await this.redisService.client.keys('student:*');
    if (cachedUsers.length > 0) {
      const usersFromRedis = await Promise.all(
        cachedUsers.map((key) => this.redisService.client.get(key)),
      );
      console.log('Students from Redis:', usersFromRedis);
      return usersFromRedis.map((userJson) => {
        const user = JSON.parse(userJson);
        return {
          ...user,
          id: user._id,
          _id: undefined,
        };
      });
    } else {
      const students = await this.studentsService.findAll();
      for (const student of students) {
        const key = `student:${student.id}`;
        const value = JSON.stringify(student);
        await this.redisService.client.set(key, value);
      }
      console.log('students from mongodb');

      return students;
    }
  }

  @Query(() => StudentType)
  async Student(@Args('id') id: string) {
    const cacheKey = `student:${id}`;
    const cachedStudent = await this.redisService.client.get(cacheKey);
  
    console.log('Data retrieved from Redis:', cachedStudent);
  
    if (cachedStudent) {
      console.log('Raw data from Redis:', cachedStudent);
      let cachedData;
      try {
        cachedData = JSON.parse(cachedStudent);
        console.log('Parsed data from Redis:', cachedData);
      } catch (e) {
        console.error('Failed to parse data from Redis:', e);
        return null;
      }
  
      const student = {
        ...cachedData,
        id: cachedData._id,
      };
  
      console.log('Processed student data:', student);
      return student;
    }
  
    console.log('Fetching student from the service:', id);
    const student = await this.studentsService.findById(id);
  
    if (student) {
      console.log('Student data from service:', student);
      await this.redisService.client.set(cacheKey, JSON.stringify(student));
      return student;
    } else {
      console.log('No student found with id:', id);
      return null;
   
  
  }
  }
  @Query(() => [StudentType])
  async findStudentsByName(@Args('name') name: string) {
    console.log(`Fetching students with name: ${name}`);
    return this.studentsService.findByName(name);
  }
  @Mutation(() => StudentType)
  async addStudent(
    @Args('createStudentInput') createStudentInput: StudentInput,
  ) {
    console.log('Adding new student:', createStudentInput);
    const newStudent = await this.studentsService.create(createStudentInput);
    return newStudent;
  }
  @Mutation(() => StudentType)
  async updateStudent(
    @Args('id') id: string,
    @Args('updateStudentInput') updateStudentInput: StudentInput,
  ) {
    const updatedStudent = await this.studentsService.update(
      id,
      updateStudentInput,
    );
    return updatedStudent;
  }
  @Mutation(() => Boolean)
  async deleteStudent(@Args('id') id: string, @Context() context: any) {
    const token = context.req.headers.authorization;

    console.log('Deleting student with ID:', id);
    const result = await this.studentsService.delete(id, {
      authorization: token,
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  }
  @Mutation(() => LoginResponse)
  async loginStudent(@Args('loginInput') loginInput: LoginInput) {
    console.log('Logging in student:', loginInput);
    const student = await this.studentsService.loginStudent(
      loginInput.email,
      loginInput.password,
    );
    if (!student) {
      throw new Error('Invalid credentials');
    }
    return student;
  }
}
