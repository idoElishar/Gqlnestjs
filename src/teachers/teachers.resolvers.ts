/* eslint-disable prettier/prettier */

import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TeachersService } from './Teachers.service';
import { LoginResponse, TeacherType } from 'src/dto/createteacher';
import { TeacherInput } from 'src/inputs/teacher.inputs';
import { RedisService } from 'src/redis/redis.service';
import {  UsePipes, ValidationPipe } from '@nestjs/common';



@Resolver()
export class TeachersResolver {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly redisService: RedisService, 
  ) { }
  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [TeacherType])
  async Teachers() {
    const cachedUsers = await this.redisService.client.keys('*');

    if (cachedUsers.length > 0) {
      const usersFromRedis = await Promise.all(
        cachedUsers.map((key) => this.redisService.client.get(key)),
      );
      console.log('Users from Redis:', usersFromRedis);

      return usersFromRedis.map((userJson) => {
        const user = JSON.parse(userJson);
        return { ...user, id: user._id, _id: undefined }; 
      });
    }

    return this.teachersService.findAll();
  }

  @Query(() => TeacherType)
  async Teacher(@Args('id') id: string) {
    const cacheKey = `teacher:${id}`;
    const cachedTeacher = await this.redisService.client.get(cacheKey);

    if (cachedTeacher) {
      console.log('Returning teacher from Redis cache:', id);
      const cachedData = JSON.parse(cachedTeacher);

      if (!cachedData._doc) {
        console.error('Invalid data structure from Redis cache:', cachedData);
        return null;
      }

      const teacher = {
        ...cachedData._doc,
        id: cachedData._doc._id
      };

      console.log('Processed teacher data:', teacher);
      return teacher;
    }

    console.log('Fetching teacher from the service:', id);
    const teacher = await this.teachersService.findById(id);

    if (teacher) {
      console.log('Teacher data:', teacher);

      await this.redisService.client.set(
        cacheKey,
        JSON.stringify(teacher)
      );
    } else {
      console.error('Teacher not found:', id);
    }

    return teacher;
  }




  @Mutation(() => TeacherType)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateTeacher(
    @Args('id') id: string,
    @Args('input') input: TeacherInput,
  ) {
    const updatedTeacher = await this.teachersService.update(id, input);
  
    if (updatedTeacher) {
      console.log('Updated teacher data:', updatedTeacher);
  
      const cacheKey = `teacher:${id}`;
  
      const cachedTeacher = await this.redisService.client.get(cacheKey);
  
      if (cachedTeacher) {
        console.log('Teacher found in Redis cache, updating:', id);
  
        await this.redisService.client.set(
          cacheKey,
          JSON.stringify(updatedTeacher)
        );
      } else {
        console.log('Teacher not found in Redis cache, adding:', id);
  
        await this.redisService.client.set(
          cacheKey,
          JSON.stringify(updatedTeacher)
        );
      }
      console.log('Updated/Added teacher data in Redis cache:', id);
    } else {
      console.error('Failed to update teacher:', id);
    }
  
    return updatedTeacher;
  }
  @Mutation(() => Boolean)
  async deleteTeacher(
    @Args('id') id: string,
    @Context() context: any,
  ): Promise<boolean> {
    const token = context.req.headers.authorization;
    const result = await this.teachersService.delete(id, { authorization: token });
    if (result) {
      console.log('Teacher deleted from database:', id);
  
      const cacheKey = `teacher:${id}`;
  
      await this.redisService.client.del(cacheKey);
      console.log('Teacher removed from Redis cache:', id);
    } else {
      console.error('Failed to delete teacher:', id);
    }
  
    return result;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.teachersService.login(email, password);
  }
}
