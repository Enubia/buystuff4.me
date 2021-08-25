export const PORT = 3001;
export const environment = {
  development: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: 'mongodb://localhost:27017/buystuff4me',
  },
  production: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: String(process.env.MONGO_URL),
  },
};
