export default () => ({
  sqs: {
    params: {
      region: 'ru-central1',
      endpoint: process.env.SQS_ENDPOINT || 'https://message-queue.api.cloud.yandex.net',
    },
    queue: process.env.SQS_QUEUE || '',
  },
  horoscope: {
    baseUrl: process.env.HORO_URL || '',
    part: process.env.HORO_PART || '',
  },
  pixabay: {
    apiKey: process.env.PIXABAY_API_KEY || '',
  },
  pexels: {
    apiKey: process.env.PEXELS_API_KEY || '',
  },
});
