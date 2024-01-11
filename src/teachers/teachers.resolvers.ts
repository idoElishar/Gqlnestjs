/* eslint-disable prettier/prettier */

import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TeachersService } from './Teachers.service';
import { LoginResponse, TeacherType } from 'src/dto/createteacher';
import { TeacherInput } from 'src/inputs/teacher.inputs';

@Resolver()
export class TeachersResolver {
  constructor(private readonly teachersService: TeachersService) {}
  @Query(() => String)
  async hello() {
    return 'hello';
  }
  @Query(() => [TeacherType])
  async Teachers() {
    return this.teachersService.findAll();
  }
  @Query(() => TeacherType)
  async Teacher(@Args('id') id: string) {
    return this.teachersService.findById(id);
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
  async deleteTeacher(@Args('id') id: string, @Context() context: any): Promise<boolean> {
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
