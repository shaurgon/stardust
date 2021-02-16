export enum SignGroups {
  aries = '139765675',
  taurus = '139765725',
  gemini = '139710634',
  cancer = '139765794',
  leo = '139765844',
  virgo = '139765874',
  libra = '139497893',
  scorpio = '139765927',
  sagittarius = '139765953',
  capricorn = '139765994',
  aquarius = '139765877',
  pisces = '139766081',
}

export interface vkError {
  error_msg: string;
  [key: string]: any;
}

export interface vkResponse {
  post_id: number;
  queryData: {
    owner_id: number;
    message: string;
    access_token: string;
    [T: string]: any;
  };
}
