import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { VK_CONNECTION } from './app.constants';

import {
  MessagesContainer,
  MessageAttributeValue,
  SignEnum,
  vkResponse,
  vkError
} from './interfaces';

type Sign = {
  sign: MessageAttributeValue
};

@Injectable()
export class AppService {
  @Inject(VK_CONNECTION)
  private vk: any;

  constructor() {}

  async publishVK(sign: string, textMessage: string): Promise<any> {
    const ownerId = SignEnum[sign];
    const nextDate: string = moment().locale('ru').startOf('day').add(1, 'days').format('D MMMM, dddd');
    const result = await this.vk.post('wall.post', {
      owner_id: -ownerId,
      message: `${nextDate}\n${textMessage}`,
      from_group: 1,
      v: '5.124'
    }).catch(this.errorHandler)
    return result;
  }

  async publishTG(sign: string, textMessage: string): Promise<any> {
    const group = `@${sign}_horoscope`;
    // const result = await this.tg.post();
  }

  /**
   * Триггер: MQ
   * при получении сообщения паблишит его в телегу и вк
   */
  async sub(data: MessagesContainer): Promise<string> {
    const { messages } = data;
    for (const message of messages) {
      const { body, message_attributes } = message.details.message;
      const sign = message_attributes.sign.string_value;
      const vkResult: vkResponse = await this.publishVK(sign, body);
      // const tgResult = await this.publishTG(sign, body);
      console.log(`Published to '${sign}' group with post_id ${vkResult.post_id}`);
    }
    
    return 'OK';
  }

  errorHandler(e: vkError) {
    console.error(e.error_msg);
  }
}
