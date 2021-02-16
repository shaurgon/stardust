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
    key: process.env.PIXABAY_API_KEY || '',
    q: 'sea',
    category: 'nature',
    min_width: 700,
    min_height: 500,
    orientation: 'horizontal',
    image_type: 'photo',
    order: 'latest',
  },
});
