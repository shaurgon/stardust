import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SQS } from 'aws-sdk';
import { SqsProvider } from './sqs.provider';
import { SQS_CONNECTION } from './aws.constants';

type ConnectionParams = {
    region: string;
    endpoint: string;
}

const SqSConnectionFactory = {
    provide: SQS_CONNECTION,
    useFactory: async (config: ConfigService): Promise<any> => {
      const params = config.get<ConnectionParams>('sqs.params');
      const connection = new SQS(params);
      return connection;
    },
    inject: [ConfigService]
}

@Module({
  providers: [SqSConnectionFactory, SqsProvider],
  exports: [SqSConnectionFactory, SqsProvider],
})
export class AwsModule {}
