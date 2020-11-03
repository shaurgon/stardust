import { Inject, Injectable } from "@nestjs/common";

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FetchProvider {
    private config;

    constructor(private readonly configService: ConfigService) {
        this.config = configService.get('horoscope');
    }

    async fetchData(sign: string): Promise<string> {
        const link: string = `${this.config.baseUrl}/${sign}.html`
        const data: string = await fetch(link)
          .then((res: any) => res.buffer())
          .then((buffer: Buffer) => iconv.decode(buffer, 'windows-1251'));
        return this.parseData(data);
    }
    
    parseData(page: string): string {
        const $ = cheerio.load(page);
        const dom = $(this.config.part);
        return dom.text();
    }
}
