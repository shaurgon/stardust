import { Params } from 'nestjs-pino';

const prettyConfig = {
  levelFirst: true,
  colorize: true,
  translateTime: true,
};

export const loggerConfig: Params = {
  pinoHttp: {
    base: null,
    // messageKey: 'MESSAGE',
    autoLogging: false,
    prettyPrint: process.env.NODE_ENV !== 'production' ? prettyConfig : false,
    // formatters: {
    //   log: (object: any) => ({
    //     ...object,
    //     PROGRAM: `omni-channel/${process.env.SERVICE_NAME}/${object.extra ?? 'request'}`,
    //   }),
    // },
  },
};
