import { store } from 'store';

const state = store?.getState();
const application = state?.application;

const priceFormatter = (
  locale: string = application?.locale || 'en-US',
  currency: string = application?.currencyCode || 'USD',
  style: string = 'currency',
) => new Intl.NumberFormat(locale, {
  style,
  currency,
});

export default priceFormatter;
