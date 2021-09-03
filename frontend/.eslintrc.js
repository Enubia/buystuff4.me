module.exports = {
  root: true,
  extends: ['@hokify/eslint-config-vue'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    extraFileExtensions: ['.vue'],
  },
};
