/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CatsModule,
StudentsModule,
    TeachersModule,
    CoursesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb+srv://ido:tgbyhn67@cluster0.11bdobw.mongodb.net/Project'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

