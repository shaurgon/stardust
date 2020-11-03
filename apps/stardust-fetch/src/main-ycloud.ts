import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

export async function createApp(): Promise<any> {
  const app = await NestFactory.create(AppModule, { logger: false });
  const data = await app.get(AppService).collectData();
  return {
    code: 200,
    body: data
  };
}
