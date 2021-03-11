import { FetchProvider } from './fetch.provider';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as qs from 'qs';
import * as _ from 'lodash';

@Injectable()
export class PixabayService extends FetchProvider {
  private config;

  constructor(private readonly configService: ConfigService) {
    super();
    this.config = configService.get('pixabay');
  }

  async get(query: string, dataType: string): Promise<any> {
    const page = ['next_week', 'this_week'].includes(dataType) ? this.dayOfMonth() + 10 : this.dayOfMonth();
    const params = {
      key: this.config.apiKey,
      q: query,
      category: 'nature',
      min_width: 700,
      min_height: 500,
      orientation: 'horizontal',
      image_type: 'photo',
      order: 'latest',
      per_page: 12,
      page,
    };
    const link = `https://pixabay.com/api/?${qs.stringify(params)}`;
    const json = await this.fetchJson(link);
    return _.map(json.hits, 'webformatURL');
  }

  dayOfMonth(): number {
    const date = new Date();
    return date.getDate();
  }
}
