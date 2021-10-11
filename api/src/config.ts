export const MAX_DOCUMENT_COUNT = 100;
export const PORT = 3001;

export const environment = {
  development: {
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://studio.apollographql.com',
    ],
  },
  testing: {
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://studio.apollographql.com',
    ],
  },
  production: {
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://buystuff4.me',
    ],
  },
};
