import { Injectable } from '@nestjs/common';
import { Path, Sign } from './app.interfaces';
import { SqsProvider } from '@stardust/common/aws/sqs.provider';
// import { PixabayService } from '@stardust/common/fetch/services/pixabay.service';
import { HoroService } from '@stardust/common/fetch/services/horo.service';
import { PexelsService } from '@stardust/common/fetch/services/pexels.service';

interface publishParams {
  sign: string;
  dataType: string;
  photoLink?: string;
  delay?: number;
}

@Injectable()
export class AppService {
  constructor(
    // private readonly pixabayService: PixabayService,
    private readonly pexelsService: PexelsService,
    private readonly horoService: HoroService,
    private readonly sqsProvider: SqsProvider,
  ) {}

  /**
   * Триггер: Cron (10 вечера)
   */
  async collectData(dataType: string): Promise<string> {
    const path: string = Path[dataType];
    // const photos = await this.pixabayService.get('sea', dataType);
    const photos = await this.pexelsService.get(dataType);

    for (const sign in Sign) {
      const signId = Object.keys(Sign).indexOf(sign);
      const data: string = await this.horoService.get(`${path}/${Sign[sign]}.html`);
      await this.publish(data, { sign, dataType, photoLink: photos[signId], delay: signId });
    }
    return 'done';
  }

  async publish(data: string, { sign, dataType, photoLink, delay }: publishParams) {
    await this.sqsProvider.sendMessage(
      data,
      {
        sign: { DataType: 'string', StringValue: sign },
        type: { DataType: 'string', StringValue: dataType },
        ...(photoLink && { photo: { DataType: 'string', StringValue: photoLink } }),
      },
      delay
    );
    console.log(`${sign} (${dataType}) was published (delay ${delay * 15}s)`);
  }
}
