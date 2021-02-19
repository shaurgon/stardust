import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { PinoLogger } from 'nestjs-pino';
import { ASYNC_STORAGE } from './logger.constants';

@Injectable()
export class LoggerProvider implements LoggerService {
  constructor(
    @Inject(ASYNC_STORAGE) private readonly asyncStorage: AsyncLocalStorage<Map<string, string>>,
    private readonly logger: PinoLogger
  ) {}

  getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }

  error(message: any, trace?: string, context?: string): void {
    const requestId = this.asyncStorage.getStore()?.get('requestId');
    this.logger.error({ requestId }, this.getMessage(message, context), trace);
  }

  log(message: any, context?: string): any {
    const requestId = this.asyncStorage.getStore()?.get('requestId');
    this.logger.info({ requestId }, this.getMessage(message, context));
  }

  warn(message: any, context?: string): any {
    const requestId = this.asyncStorage.getStore()?.get('requestId');
    this.logger.warn({ requestId }, this.getMessage(message, context));
  }
}
