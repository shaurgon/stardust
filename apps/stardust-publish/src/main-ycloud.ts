import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { MessagesContainer } from './interfaces/message.interface';

export async function createApp(event?: MessagesContainer, context?: any): Promise<any> {
  const app = await NestFactory.create(AppModule, { logger: false });
  const data = await app.get(AppService).sub(event);
  return { 
    code: 200,
    body: data
  };
}

