import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export type LanguageType = {
  id: string;
  label: string;
}

export interface Application {
  language: LanguageType,
  locale: string,
  currencyCode: string,
  priceScale: number,
}

export const initialState: Application = {
  language: { id: 'en', label: 'English' },
  locale: 'en-US',
  currencyCode: 'USD',
  priceScale: 2,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setLanguage: (state: Application, { payload }): void => {
      state.language = payload;
    },
    setCurrencyCode: (state: Application, { payload }): void => {
      state.currencyCode = payload;
    },
    setLocale: (state: Application, { payload }): void => {
      state.locale = payload;
    },
    resetApp: (): Application => initialState,
  },
});

export const {
  setLanguage,
  setCurrencyCode,
  setLocale,
  resetApp,
} = applicationSlice.actions;
export default applicationSlice.reducer;

// Selectors
export const applicationSelector = (state: RootState): Application => state.application;
export const languageSelector = (state: RootState): LanguageType => state.application.language;
export const currencyCodeSelector = (state: RootState): string => state.application.currencyCode;
export const localeSelector = (state: RootState): string => state.application.locale;
export const priceScaleSelector = (state: RootState): number => state.application.priceScale;
