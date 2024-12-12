import { persistor, store } from '@/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

interface IStoreProvider {
  children: ReactNode;
}

export default function StoreProvider({ children }: IStoreProvider) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
