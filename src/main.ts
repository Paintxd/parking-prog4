import 'reflect-metadata';
import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { RedisSession } from './session/redisSession';

require('dotenv').config();

const PORT = process.env.PORT || 8081;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.use(RedisSession.getSession());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(
          errors.map((error: ValidationError) => {
            return { target: error.property, fields: Object.values(error.constraints) };
          }),
        );
      },
    }),
  );

  await app.listen(PORT);
  new Logger().log(`listening on ${PORT}`);
}
bootstrap();
