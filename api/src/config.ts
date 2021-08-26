export const PORT = 3001;
export const environment = {
  development: {
    origin: ['http://localhost:3001', 'https://studio.apollographql.com'],
    dbString: 'mongodb://localhost:27017/buystuff4me',
  },
  production: {
    origin: ['https://buystuff4.me'],
    dbString: String(process.env.MONGO_URL),
  },
};
