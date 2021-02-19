import { Injectable } from '@nestjs/common';
import { Path, Sign } from './app.interfaces';
import { ConfigService } from '@nestjs/config';
import { FetchProvider } from '@stardust/common/fetch/fetch.provider';
import { SqsProvider } from '@stardust/common/aws/sqs.provider';

interface publishParams {
  sign: string;
  dataType: string;
  photoLink?: string;
}

@Injectable()
export class AppService {
  private config;

  constructor(
    private readonly fetchProvider: FetchProvider,
    private readonly sqsProvider: SqsProvider,
    private readonly configService: ConfigService
  ) {
    this.config = configService.get('horoscope');
  }

  /**
   * Триггер: Cron (10 вечера)
   */
  async collectData(dataType: string): Promise<string> {
    const path: string = Path[dataType];
    const photos = await this.fetchProvider.fetchPhotos('sea', dataType);

    for (const sign in Sign) {
      const signId = Object.keys(Sign).indexOf(sign);
      const link =
        dataType === 'next_week'
          ? `${this.config.baseUrl}/${path}?id=${signId + 1}`
          : `${this.config.baseUrl}/${path}/${Sign[sign]}.html`;
      const data: string = await this.fetchProvider.fetchData(link);
      await this.publish(data, { sign, dataType, photoLink: photos[signId] });
      await this.delay(1000); // Иначе ВК банит по рейт лимитам
    }
    return 'done';
  }

  async publish(data: string, { sign, dataType, photoLink }: publishParams) {
    console.log(data);
    console.log(sign, dataType, photoLink);
    await this.sqsProvider.sendMessage(data, {
      sign: { DataType: 'string', StringValue: sign },
      type: { DataType: 'string', StringValue: dataType },
      ...(photoLink && { photo: { DataType: 'string', StringValue: photoLink } }),
    });
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
}
