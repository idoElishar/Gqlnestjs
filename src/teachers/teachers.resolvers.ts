/* eslint-disable prettier/prettier */

import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TeachersService } from './Teachers.service';
import { LoginResponse, TeacherType } from 'src/dto/createteacher';
import { TeacherInput } from 'src/inputs/teacher.inputs';
import { RedisService } from 'src/redis/redis.service';

@Resolver()
export class TeachersResolver {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly redisService: RedisService, // הוסף את RedisService
  ) {}
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
        return { ...user, id: user._id, _id: undefined }; // החלף את _id ב-id
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
      const teacher = JSON.parse(cachedTeacher);
      console.log(teacher._doc);

      teacher.id = teacher._id;

      return teacher._doc;
    }

    console.log('Fetching teacher from the service:', id);
    const teacher = await this.teachersService.findById(id);

    if (teacher) {
      await this.redisService.client.set(
        cacheKey,
        JSON.stringify({ ...teacher, id: teacher._id, _id: undefined }),
      );
    }

    return teacher;
  }

  @Mutation(() => TeacherType)
  async CreateTeacher(@Args('input') input: TeacherInput) {
    return this.teachersService.create(input);
  }
  @Mutation(() => TeacherType)
  async updateTeacher(
    @Args('id') id: string,
    @Args('input') input: TeacherInput,
  ) {
    return this.teachersService.update(id, input);
  }
  @Mutation(() => Boolean)
  async deleteTeacher(
    @Args('id') id: string,
    @Context() context: any,
  ): Promise<boolean> {
    const token = context.req.headers.authorization;
    return this.teachersService.delete(id, { authorization: token });
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.teachersService.login(email, password);
  }
}
