/* eslint-disable prettier/prettier */
import { Logger, MiddlewareConsumer, Module, NestMiddleware } from '@nestjs/common';
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
import { Request, Response, NextFunction } from 'express';

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

export class AppModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}


export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const start = new Date();
    const { method, originalUrl } = req;
    res.on('finish', () => {
      const end = new Date();
      const duration = end.getTime() - start.getTime();
      const statusCode = res.statusCode;
      const statusMessage = res.statusMessage;

      statusCode >= 400 ?
        this.logger.error(`${method} ${originalUrl} - ${statusCode} - ${duration}ms ${statusMessage}`)
        :
        this.logger.log(`${method} ${originalUrl} - ${duration}ms`);

    });

    next();
  }
}
