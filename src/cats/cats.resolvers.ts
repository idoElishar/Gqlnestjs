/* eslint-disable prettier/prettier */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CatType } from 'src/dto/createcat.dto';
import { CatInput } from 'src/inputs/cats.input';

@Resolver()
export class CatsResolver {
  constructor(
    private readonly catsService: CatsService,
  ) {}
  @Query(() => String)
  async hello()  {
    return 'hello'
  }
  @Query(()=>[CatType])
  async cats() {
    return this.catsService.findAll();
  }
  @Mutation(()=>[CatType])
  async Createcat(@Args('input')input:CatInput){
    return this.catsService.create(input);
  }
}
