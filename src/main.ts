import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { RedisSession } from './session/redisSession';
import { Logger, ValidationPipe } from '@nestjs/common';

require('dotenv').config();

const PORT = process.env.PORT || 8081;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.use(RedisSession.getSession());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
  new Logger().log(`listening on ${PORT}`);
}
bootstrap();
