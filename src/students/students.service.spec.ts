/* eslint-disable prettier/prettier */

// import { Test, TestingModule } from '@nestjs/testing';
// import { StudentsService } from './Students.service';
// import { StudentsModule } from './students.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { StudentSchema } from './students.schema';
// import { JwtModule } from '@nestjs/jwt';

// describe('studentService', () => {
//   let service: StudentsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         StudentsModule,
//         MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
//         JwtModule.register({ secret: 'testSecret', signOptions: { expiresIn: '24h' } }),
//       ],
//       providers: [
//         StudentsService,
//       ],
//     }).compile();

//     service = module.get<StudentsService>(StudentsService);
//   });

//   it('should return an array of students', async () => {
//     const students = await service.findAll();

//     // ניתן להחליף את הבדיקות הבאות בבדיקות רלוונטיות בהתאם למידע המדויק שאתה רוצה לבדוק
//     expect(students).toBeDefined();
//     expect(Array.isArray(students)).toBe(true);
//   });
// });

