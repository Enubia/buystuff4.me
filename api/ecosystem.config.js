module.exports = {
  apps: [
    {
      name: 'buystuff4.me backend',
      exec_mode: 'cluster',
      instances: 'max',
      script: './dist/index.js'
    },
  ],
};
