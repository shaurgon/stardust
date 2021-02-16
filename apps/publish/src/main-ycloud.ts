import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { MessagesContainer } from './interfaces';

export async function handler(event?: MessagesContainer): Promise<any> {
  const app = await NestFactory.create(AppModule, { logger: false });
  const data = await app.get(AppService).sub(event);
  return {
    code: 200,
    body: data,
  };
}
