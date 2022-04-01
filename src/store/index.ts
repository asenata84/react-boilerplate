import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import application from './slices/application';
import error from './slices/error';
import loader from './slices/loader';
import modals from './slices/modals';
import notification from './slices/notification';
import user from './slices/user';
import counter from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    application,
    notification,
    error,
    loader,
    modals,
    user,
    counter, // TODO Remove
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
