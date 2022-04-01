import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AccessUnit } from 'components/Access/Access';
import parseJwt from 'utils/parseJwt';
import { RootState } from '..';
import { setError } from './error';

export interface User {
  name: string,
  email: string,
  isAuthenticated: boolean,
  accessToken: string,
  accessUnits: AccessUnit[],
}

export const initialState: User = {
  name: '',
  email: '',
  isAuthenticated: false,
  accessToken: '',
  accessUnits: [],
};

export const login = createAsyncThunk(
  'user/login',
  async (_params, thunkAPI): Promise<any> => {
    try {
      // TODO Login
    } catch (error: any) {
      thunkAPI.dispatch(setError({ message: error?.message || 'Login Failed!' }));
    }
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_params, thunkAPI): Promise<any> => {
    try {
      // TODO Logout
    } catch (error: any) {
      thunkAPI.dispatch(setError({ message: error?.message || 'Logout Failed!' }));
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: User, { payload }): User => {
      const { accessToken } = payload || {};
      const data = accessToken && parseJwt(accessToken);
      const accessUnits: AccessUnit[] = data?.extension_FinservRoles?.split(',')?.map((item: string) => item?.trim()) || [];

      return ({ ...state, ...payload, accessUnits });
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const userSelector = (state: RootState): User => state.user;
export const userAccessUnitsSelector = (state: RootState): AccessUnit[] => state.user.accessUnits;
