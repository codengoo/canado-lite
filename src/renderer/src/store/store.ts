import { configureStore } from '@reduxjs/toolkit';
import { noteReducer } from './features/note';
import { settingReducer } from './features/setting';

export const store = configureStore({
  reducer: {
    note: noteReducer,
    setting: settingReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
