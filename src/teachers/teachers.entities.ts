/* eslint-disable prettier/prettier */

import { Column, Entity } from 'typeorm';

    @Entity()
    /**
     * this decorator will help to auto generate id for the table.
     */
    export class Teacher1 {

    

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({ type: 'varchar', length: 15 })
    phone: string;

    @Column({ type: 'varchar', length: 40 })
    address: string;

    @Column({ type: 'varchar', length: 40 })
    email: string;

    @Column({ type: 'varchar' })
    course: string;

    @Column({ type: 'varchar' })
    images: string;
    @Column({ type: 'varchar' })
    password: string;
}