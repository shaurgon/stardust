import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import fetch, { Response, RequestInit } from 'node-fetch';
import * as iconv from 'iconv-lite';

@Injectable()
export class FetchProvider {
  async fetchJson(url: string, options?: RequestInit): Promise<any> {
    return fetch(url, options)
      .then((res) => res.json())
      .catch(this.errorHandler);
  }

  async fetchData(link: string): Promise<any> {
    return fetch(link)
      .then((res: Response) => res.buffer())
      .then((buffer: Buffer) => iconv.decode(buffer, 'windows-1251'))
      .catch(this.errorHandler);
  }

  errorHandler(error: any) {
    console.error(error);
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
}
