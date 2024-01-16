/* eslint-disable prettier/prettier */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './interfaces.ts/cat.interface';
import { CatInput } from 'src/inputs/cats.input';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  async create(createCatDto: CatInput): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }
  
  
  async findById(catId: string): Promise<Cat> {
    return this.catModel.findById(catId).exec();
  }
  async update(catId: string, updateData: CatInput): Promise<Cat> {
    return this.catModel.findByIdAndUpdate(catId, updateData, { new: true }).exec();
  }

    async delete(catId: string): Promise<{ deleted: boolean }> {
    const result = await this.catModel.deleteOne({ _id: catId }).exec();
    return { deleted: result.deletedCount > 0 };
  }
}
