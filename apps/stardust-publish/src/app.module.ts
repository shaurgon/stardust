import { Module } from '@nestjs/common';
import { VK_CONNECTION } from './app.constants';
import { AppService } from './app.service';
import * as easyvk from 'easyvk';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config';

type ConnectionParams = {
  clientId?: string;
  clientSecret?: string;
  token?: string;
  save: boolean;
}

const vkConnectionFactory = {
  provide: VK_CONNECTION,
  useFactory: async (config: ConfigService): Promise<any> => {
    const params = config.get<ConnectionParams>('vk');
    const connection = await easyvk(params);
    return connection;
  },
  inject: [ConfigService]
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [vkConnectionFactory, AppService],
})
export class AppModule {}
