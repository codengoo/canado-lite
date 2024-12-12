import { ElectronAPI } from '@electron-toolkit/preload';
import { INotifPayload } from '../main/notification';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      closeWindows: () => void;
      hideWindows: () => void;
      showNotif: (payload: INotifPayload) => void;

      onShowWindow: (callback: () => void) => void;
    };
  }
}
