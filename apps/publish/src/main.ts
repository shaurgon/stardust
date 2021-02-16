import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { MessagesContainer } from './interfaces';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(event?: MessagesContainer): Promise<any> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const data = await app.get(AppService).sub(event);
  return {
    code: 200,
    body: data,
  };
}

bootstrap();
