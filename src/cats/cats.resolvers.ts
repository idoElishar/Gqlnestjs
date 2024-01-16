/* eslint-disable prettier/prettier */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CatType } from '../dto/createcat.dto';
import { CatInput } from '../inputs/cats.input';

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
  async findAll() {
    return this.catsService.findAll();
  }
  @Query(() => CatType)
  async cat(@Args('id') id: string) {
    return this.catsService.findById(id);
  }
  @Mutation(()=>CatType)
  async Createcat(@Args('input')input:CatInput){
    return this.catsService.create(input);
  }
  @Mutation(() => CatType)
  async updateCat(@Args('id') id: string, @Args('input') input: CatInput) {
    return this.catsService.update(id, input);
  }
  @Mutation(() => Boolean)
  async deleteCat(@Args('id') id: string) {
    const result = await this.catsService.delete(id);
    return result.deleted;
  }
}
