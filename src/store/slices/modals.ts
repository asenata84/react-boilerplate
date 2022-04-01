import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export enum ModalNames {
  CONFIRM_MODAL = 'CONFIRM_MODAL',
}

export interface Modal {
  name: ModalNames,
  isOpen: boolean,
}

export const initialState: Modal[] = [];

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state: Modal[], { payload }): void => {
      const modalIndex = state.findIndex((item) => item.name === payload.name);

      if (modalIndex !== -1) {
        state[modalIndex] = { ...payload };
      } else {
        state.push(payload);
      }
    },
  },
});

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;

// Selectors
export const modalsSelector = (state: RootState): Modal[] => state.modals;
