import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetNotification } from 'store/events';
import { RootState } from '..';
import { incrementAsync } from './counterSlice';

export enum NotificationType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AppNotification {
  isOpen: boolean
  type?: NotificationType
  title?: string
  titleKey?: string
  text?: string
  textKey?: string
  autoHideDuration?: number
}

export const initialState: AppNotification = {
  isOpen: false,
  type: NotificationType.SUCCESS,
  title: undefined,
  titleKey: 'successfullySaved.title',
  text: undefined,
  textKey: undefined,
  autoHideDuration: 0,
};

export const handleNotification = (state: AppNotification, notification?: PayloadAction<any>) => {
  const { payload } = notification || {};
  const {
    isOpen,
    type,
    title,
    titleKey,
    text,
    textKey,
    autoHideDuration,
  } = payload || {};

  state.isOpen = isOpen !== undefined ? isOpen : true;
  state.textKey = textKey || initialState.textKey;
  state.autoHideDuration = autoHideDuration !== undefined ? autoHideDuration : 3000;
  state.type = type || initialState.type;
  state.title = title || initialState.title;
  state.titleKey = titleKey || initialState.titleKey;
  state.text = text || initialState.text;
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state: AppNotification, { payload }): AppNotification => ({ ...state, ...payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(resetNotification, () => initialState);

    builder.addCase(incrementAsync.fulfilled, handleNotification);
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

// Selectors
export const notificationSelector = (state: RootState): AppNotification => state.notification;
