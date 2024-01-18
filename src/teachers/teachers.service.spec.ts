/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { TeachersService } from './Teachers.service';
// import { Teacher } from './interfaces/teacher.interface';
import { JwtService } from '@nestjs/jwt';

class MockTeacherModel {
  static mockTeachersArray = [
    {
      id: "658b2d393fb443e06e3f3360",
      name: "Teacher Name",
      phone: "054",
      address: "Some Address",
      email: "email@example.com",
      course: "Math",
      images: "image.jpg",
      password: "password",
    },
  ];

  static find() {
    return {
      exec: jest.fn().mockResolvedValue(MockTeacherModel.mockTeachersArray),
    };
  }

  static findById(id) {
    const found = MockTeacherModel.mockTeachersArray.find(teacher => teacher.id === id);
    return {
      exec: jest.fn().mockResolvedValue(found),
    };
  }

  static create(data) {
    const newTeacher = { ...data, id: 'some-new-id', save: jest.fn().mockResolvedValue(data) };
    MockTeacherModel.mockTeachersArray.push(newTeacher);
    return newTeacher;
  }
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
          useValue: MockTeacherModel,
        },
        {
          provide: JwtService,
          useValue: {},
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

  it('should return a teacher by ID', async () => {
    const teacherId = "658b2d393fb443e06e3f3360";
    const teacher = await service.findById(teacherId);
    expect(teacher).toEqual(MockTeacherModel.mockTeachersArray.find(t => t.id === teacherId));
  });

  it('should create and return a new teacher', async () => {
    const newTeacherData = {
      name: "New Teacher",
      phone: "05432",
      address: "Some 32",
      email: "email@example1.com",
      course: "Math 1",
      images: "image.jpg",
      password: "password1",
    };
    const createdTeacher = await MockTeacherModel.create(newTeacherData); 
    expect(createdTeacher).toMatchObject(newTeacherData);
    expect(MockTeacherModel.mockTeachersArray).toContainEqual(expect.objectContaining(newTeacherData));
  });
  
});
