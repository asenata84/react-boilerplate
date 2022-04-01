import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { incrementAsync } from './counterSlice';

export interface AppError {
  message?: string,
  messageKey?: string,
  errorTitle?: string,
  errorTitleKey?: string,
  stackTrace?: string,
  type?: string
}

export const initialState: AppError = {
  message: undefined,
  messageKey: undefined,
  errorTitle: undefined,
  errorTitleKey: undefined,
  stackTrace: undefined,
  type: undefined,
};

export const handleError = (state: AppError, error: Partial<PayloadAction<any> & { error: any }>) => {
  const {
    payload,
    error: responseError,
  } = error;

  const {
    response,
  } = payload || {};

  const {
    data,
    status,
  } = response || {};

  const {
    messages,
    code,
  } = data?.error || {};

  switch (status) {
    case 403:
      state.errorTitleKey = 'errors:status.403.title';
      state.messageKey = 'errors:status.403.message';
      break;

    default:
      state.message = (messages?.length > 0 && messages[0])
        || responseError?.message
        || 'Something Went Wrong!';
      state.errorTitleKey = `errors:errorCode.${code}`;
      break;
  }
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state: AppError, { payload }): AppError => ({ ...state, ...payload }),
    resetError: (): AppError => (initialState),
  },
  extraReducers: (builder) => {
    // SECTION
    builder.addCase(incrementAsync.rejected, handleError);
  },
});

export const { setError, resetError } = errorSlice.actions;
export default errorSlice.reducer;

// Selectors
export const errorSelector = (state: RootState): AppError => state.error;
