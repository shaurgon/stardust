export default () => ({
    vk: {
        clientId: process.env.VK_CLIENT_ID || '',
        clientSecret: process.env.VK_CLIENT_SECRET || '',
        token: process.env.VK_TOKEN || '',
        save: false
    }
  });
