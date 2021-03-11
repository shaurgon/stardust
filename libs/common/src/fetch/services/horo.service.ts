import { Injectable } from '@nestjs/common';
import { FetchProvider } from './fetch.provider';
import { ConfigService } from '@nestjs/config';
import * as cheerio from 'cheerio';

@Injectable()
export class HoroService extends FetchProvider {
  private config;

  constructor(private readonly configService: ConfigService) {
    super();
    this.config = this.configService.get('horoscope');
  }

  async get(path: string): Promise<any> {
    const url = `${this.config.baseUrl}/${path}`;
    const raw = await this.fetchData(url);
    if (!raw) {
      return '';
    }
    return this.parseData(raw);
  }

  parseData(page: string): string {
    const $ = cheerio.load(page);
    const dom = $(this.config.part);
    return dom.text();
  }
}
