/* eslint-disable prettier/prettier */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from './Courses.service';
import { CourseType } from 'src/dto/createcourse';
import { CourseInput } from 'src/inputs/course.input';
// import { CourseInput } from 'src/inputs/Course.input';

@Resolver()
export class CoursesResolver {
  constructor(
    private readonly coursesService: CoursesService,
    // private readonly redisService: RedisService, 
  ) {}
  @Query(() => String)
  async hello() {
    return 'hello';
  }
  @Query(() => [CourseType])
  async Courses() {
    return this.coursesService.findAll();
  }
  @Query(() => CourseType)
  async Course(@Args('id') id: string) {
    console.log('Fetching course from the service:', id);
    const Course = await this.coursesService.findCourseById(id);
    return Course;
  }
  @Mutation(() => CourseType)
  async addCourse(@Args('createCourseInput') createCourseInput: CourseInput) {
    console.log('Adding new Course:', createCourseInput);
    const newCourse = await this.coursesService.createCourse(createCourseInput);
    return newCourse;
  }
  @Mutation(() => CourseType)
  async updateCourse(@Args('id') id: string, @Args('updateCourseInput') updateCourseInput: CourseInput) {
    const updatedCourse = await this.coursesService.updateCourse(id, updateCourseInput);
    return updatedCourse;
  }
 
}