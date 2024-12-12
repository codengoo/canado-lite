import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';
import { INotifPayload } from '../main/notification';

const api = {
  closeWindows: () => ipcRenderer.send('close-win'),
  hideWindows: () => ipcRenderer.send('hide-win'),
  showNotif: (payload: INotifPayload) => ipcRenderer.send('show-notif', payload),

  setStorage: (key: string, value: object) => ipcRenderer.invoke('storage:set', key, value),
  getStorage: (key: string) => ipcRenderer.invoke('storage:get', key),
  removeStorage: (key: string) => ipcRenderer.invoke('storage:remove', key),

  onShowWindow: (callback: () => void) => ipcRenderer.on('show-win', () => callback()),
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
