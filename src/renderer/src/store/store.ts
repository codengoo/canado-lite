import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { folderReducer } from './features/folder';
import { noteReducer } from './features/note';
import { settingReducer } from './features/setting';
import { storage } from './storage';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  setting: settingReducer,
  note: noteReducer,
  folder: folderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
