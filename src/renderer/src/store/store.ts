import { configureStore } from '@reduxjs/toolkit';
import { noteReducer } from './features/note';

export const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
