import { Injectable } from '@nestjs/common';
import { Sign } from './app.interfaces';
import { FetchProvider } from './fetch/fetch.provider';
import { SqsProvider } from './aws/sqs.provider';

@Injectable()
export class AppService {
  constructor(
    private readonly fetchProvider: FetchProvider,
    private readonly sqsProvider: SqsProvider
  ) {}

  /**
   * Триггер: Cron (10 вечера, возможно 9)
   */
  async collectData(): Promise<string> {
    for (const sign in Sign) {
      const data = await this.fetchProvider.fetchData(Sign[sign]);
      await this.pub(sign, data);
      await this.delay(1000); // Иначе ВК банит по рейт лимитам
    }
    return 'done';
  }

  async pub(name: string, data: string) {
    await this.sqsProvider.sendMessage(data, { sign: { DataType: 'string', StringValue: name }})
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms)
    })
  }
}
