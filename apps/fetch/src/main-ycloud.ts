import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppService } from './app.service';

export async function fetchDay(): Promise<any> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: false });
  const data = await app.get(AppService).collectData('next_day');
  return {
    code: 200,
    body: data,
  };
}

export async function fetchWeek(): Promise<any> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: false });
  const data = await app.get(AppService).collectData('week');
  return {
    code: 200,
    body: data,
  };
}
