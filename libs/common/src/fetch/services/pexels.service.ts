import { FetchProvider } from './fetch.provider';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as qs from 'qs';
import * as _ from 'lodash';

@Injectable()
export class PexelsService extends FetchProvider {
  private config;

  constructor(private readonly configService: ConfigService) {
    super();
    this.config = configService.get('pexels');
  }

  async get(dataType: string): Promise<any> {
    const page = ['next_week', 'this_week'].includes(dataType) ? this.weekOfMonth() : this.dayOfYear();
    const params = { query: this.randomQuery(), orientation: 'landscape', per_page: 12, page };
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.config.apiKey,
      },
    };
    const link = `https://api.pexels.com/v1/search?${qs.stringify(params)}`;
    const json = await this.fetchJson(link, options);
    return _.map(json.photos, 'src.landscape');
  }

  randomQuery() {
    const queryStrings = ['sea', 'nature', 'water'];
    return queryStrings[Math.floor(Math.random() * queryStrings.length)];
  }

  weekOfMonth(): number {
    const date = new Date();
    const onejan = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil(((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
    return week;
  }

  dayOfYear(): number {
    const date = new Date();
    const currentDateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    const startYearUTC = Date.UTC(date.getFullYear(), 0, 0);
    return (currentDateUTC - startYearUTC) / 24 / 60 / 60 / 1000;
  }
}
