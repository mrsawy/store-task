// src/store/slices/app.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isLocked: boolean;
  isOffline: boolean;
}

const initialState: AppState = {
  isLocked: false,
  isOffline: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload;
    },
    setOffline: (state, action: PayloadAction<boolean>) => {
      state.isOffline = action.payload;
    },
  },
});

export const { setLocked, setOffline } = appSlice.actions;
export default appSlice.reducer;