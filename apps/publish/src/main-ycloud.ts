import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { Context, MessagesContainer } from './interfaces';
import { ASYNC_STORAGE } from '@stardust/common/logger/logger.constants';
import { LoggerProvider } from '@stardust/common/logger/logger.provider';

export async function handler(event?: MessagesContainer, context?: Context): Promise<any> {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  const asyncStorage = app.get(ASYNC_STORAGE);
  const store = new Map().set('requestId', context?.requestId);

  asyncStorage.enterWith(store);
  app.useLogger(app.get(LoggerProvider));
  const data = await app.get(AppService).sub(event);
  return {
    code: 200,
    body: data,
  };
}
