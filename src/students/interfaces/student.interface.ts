/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Course {
    name: string;
  }
  
  export interface Student extends Document {
    readonly name: string;
    readonly phone: string;
    readonly address: string;
    readonly email: string;
    readonly courses: Course[];
    readonly password: string;
  }