// eslint-disable-next-line func-names
export default function ({ app }, inject) {
  const availableLocales = app.i18n.locales.filter(
    (item) => item.code && item.name,
  );
  inject('availableLocales', availableLocales);
}
