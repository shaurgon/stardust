import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as easyvk from 'easyvk';
import { VK_CONNECTION } from './vk.constants';
import { VkService } from './vk.service';

type ConnectionParams = {
  clientId?: string;
  clientSecret?: string;
  token?: string;
  save: boolean;
  utils?: {
    bots?: boolean; // Bots LongPoll
    longpoll?: boolean; // User LongPoll (возможна нестабильная работа в связи с ограничениями ВКонтакте на секцию messages)
    http?: boolean; // HTTP Клиент для работы с Audio API
    widgets?: boolean; // Дополнительные виджеты
    uploader?: boolean; // Внутреннее решение для загрузки файлов на сервер
    callbackAPI?: boolean; // Callback API
    streamingAPI?: boolean;
  };
};

const vkConnectionFactory = {
  provide: VK_CONNECTION,
  useFactory: async (config: ConfigService): Promise<any> => {
    const params = config.get<ConnectionParams>('vk');
    return await easyvk({ ...params, utils: { uploader: true }, mode: 'highload' });
  },
  inject: [ConfigService],
};

@Module({
  providers: [vkConnectionFactory, VkService],
  exports: [VK_CONNECTION, VkService],
})
export class VkModule {}
