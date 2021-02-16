import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import fetch, { Response } from 'node-fetch';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';
import * as _ from 'lodash';
import * as qs from 'qs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FetchProvider {
  private config;
  private photoConfig;

  constructor(private readonly configService: ConfigService) {
    this.config = configService.get('horoscope');
    this.photoConfig = configService.get('pixabay');
  }

  async fetchPhotos(query: string, dataType: string): Promise<string> {
    const page = dataType === 'next_week' ? this.dayOfMonth() + 10 : this.dayOfMonth();
    const params = { ...this.photoConfig, q: query, per_page: 12, page };
    const link = `https://pixabay.com/api/?${qs.stringify(params)}`;
    return await fetch(link)
      .then((res) => res.json())
      .then((res: any) => _.map(res.hits, 'webformatURL'))
      .catch(this.errorHandler);
  }

  async fetchData(link: string): Promise<string> {
    return await fetch(link)
      .then((res: Response) => res.buffer())
      .then((buffer: Buffer) => iconv.decode(buffer, 'windows-1251'))
      .then((data: string) => this.parseData(data))
      .catch((error) => {
        console.error(error);
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  errorHandler(error: any) {
    console.error(error);
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }

  parseData(page: string): string {
    const $ = cheerio.load(page);
    const dom = $(this.config.part);
    return dom.text();
  }

  dayOfMonth(): number {
    const date = new Date();
    return date.getDate();
  }
}
