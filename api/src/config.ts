export const MAX_DOCUMENT_COUNT = 100;
export const PORT = 3001;
export const environment = {
  development: {
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://studio.apollographql.com',
    ],
    dbString: 'mongodb://localhost:27017/buystuff4me',
  },
  production: {
    origin: ['https://buystuff4.me'],
    dbString: String(process.env.MONGO_URL),
  },
};
