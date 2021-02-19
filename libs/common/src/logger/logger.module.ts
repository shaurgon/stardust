import { Module } from '@nestjs/common';

import { ASYNC_STORAGE } from './logger.constants';
import { AsyncLocalStorage } from 'async_hooks';
import { LoggerProvider } from './logger.provider';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { loggerConfig } from './pino.config';
const asyncLocalStorage = new AsyncLocalStorage();

@Module({
  imports: [PinoLoggerModule.forRoot(loggerConfig)],
  providers: [
    LoggerProvider,
    {
      provide: ASYNC_STORAGE,
      useValue: asyncLocalStorage,
    },
  ],
  exports: [LoggerProvider],
})
export class LoggerModule {}
