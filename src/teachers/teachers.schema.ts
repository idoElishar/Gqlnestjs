/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';
export const TeacherSchema = new mongoose.Schema({
    name:String,
    phone:String,
    address:String,
    email:String,
    course:String,
    images:String,
}, { versionKey: false });

