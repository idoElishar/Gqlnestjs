/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { CatsResolver } from './cats.resolvers';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './cats.schema';
import { CatsService } from './cats.service';

@Module({
    imports:[MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])],
  providers: [CatsResolver,CatsService],
})
export class CatsModule {}
