import { ElectronAPI } from '@electron-toolkit/preload';
import { INotifPayload } from '../main/modules/notification';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      closeWindows: () => void;
      hideWindows: () => void;
      showNotif: (payload: INotifPayload) => void;
      changeLayout: (payload: WindowPositionType) => void;

      setStorage: (key: string, value: object) => Promise<boolean>;
      getStorage: <T>(key: string) => Promise<T | null>;
      removeStorage: (key: string) => Promise<boolean>;

      regStartup: () => Promise<boolean>;
      deregStartup: () => Promise<boolean>;
      
      onShowWindow: (callback: () => void) => void;
    };
  }
}
