import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export type Loader = {
  active: boolean
}

export const initialState: Loader = {
  active: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state: Loader, { payload }): Loader => ({ ...state, ...payload }),
  },
});

export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;

// Selectors
export const loaderSelector = (state: RootState): boolean => state.loader.active;
