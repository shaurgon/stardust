import { Params } from 'nestjs-pino';

const prettyConfig = {
  levelFirst: true,
  colorize: false,
  crlf: false,
  ignore: 'pid,hostname,time,requestId',
  messageFormat: '{msg} (RequestID: {requestId})',
};

export const loggerConfig: Params = {
  pinoHttp: {
    base: null,
    autoLogging: false,
    prettyPrint: prettyConfig,
  },
};
