/* eslint-disable prettier/prettier */

import {Document} from 'mongoose';
export interface Teacher extends Document{
    readonly name:string;
    readonly phone:string;
    readonly address:string;
    readonly email:string;
    readonly course:string;
    readonly images:string;
}