import { Module } from '@nestjs/common';
import { FetchProvider } from './fetch.provider';

@Module({
  providers: [FetchProvider],
  exports: [FetchProvider],
})
export class FetchModule {}
