/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { TeachersService } from './Teachers.service';
import { Teacher } from './interfaces/teacher.interface';
import { JwtService } from '@nestjs/jwt';

// יצירת מחלקה מדומה למודל Teacher
class MockTeacherModel {
  // יצירת מערך דומה לבדיקות
  static mockTeachersArray = [
    {
        name: "Teacher Name",
        phone: "054",
        address: "Some Address",
        email: "email@example.com",
        course: "Math",
        images: "image.jpg",
        password: "password",
      },
  ];

  find() {
    return {
        exec: jest.fn().mockResolvedValue(MockTeacherModel.mockTeachersArray),
      };  }
}

describe('TeacherService', () => {
  let service: TeachersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeachersService,
        {
          provide: 'TeacherModel', 
          useClass: MockTeacherModel,
        },
        {
            provide: JwtService,
            useValue: 'jwtService',
        },
      ],
    }).compile();

    service = module.get<TeachersService>(TeachersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of teachers', async () => {
    const teachers = await service.findAll();
    expect(teachers).toEqual(MockTeacherModel.mockTeachersArray);
  });
});
