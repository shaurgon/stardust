import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as moment from 'moment';

import { MessagesContainer } from './interfaces';
import { VkService } from '@stardust/common/vk/vk.service';
import { vkResponse } from '@stardust/common/vk/vk.interface';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);

  constructor(private readonly vkService: VkService) {}

  // async publishTG(sign: string, textMessage: string): Promise<any> {
  //   const group = `@${sign}_horoscope`;
  //   const result = await this.tg.post();
  // }

  /**
   * Триггер: MQ
   * при получении сообщения паблишит его в вк
   */
  async sub(data: MessagesContainer): Promise<string> {
    const { messages } = data;
    const nextDate: string = moment().locale('ru').startOf('day').add(1, 'days').format('D MMMM, dddd');
    const startOfWeek: string = moment().locale('ru').startOf('week').format('D MMMM');
    const endOfWeek: string = moment().locale('ru').endOf('week').format('D MMMM');
    const weekDates = `Прогноз на неделю, ${startOfWeek} - ${endOfWeek}`;

    for (const message of messages) {
      const { body, message_attributes } = message.details.message;
      if (typeof body === 'string' && body.trim() !== '' && body.trim().length > 50) {
        const sign = message_attributes.sign.string_value;
        const type = message_attributes.type.string_value;
        const photoUrl = message_attributes.photo.string_value;
        const vkMessage = `${type === 'week' ? weekDates : nextDate}\n${body}`;
        const photos = await this.vkService.uploadWallPhotoByUrl(photoUrl, sign);
        const result: vkResponse = await this.vkService.postMessage(sign, vkMessage, photos);
        this.logger.log(`Published to '${sign}' group with post_id ${result.post_id}`);

        if (type === 'week') {
          const pinned: boolean = await this.vkService.pinMessage(sign, result.post_id);
          pinned && this.logger.log(`${result.post_id} was pinned`);
        }
      } else {
        // todo сделать алертинг в телегу
        this.logger.error('body is broken! Pls fixme!', body);
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
    }

    return 'OK';
  }
}
