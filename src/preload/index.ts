import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';
import { INotifPayload } from '../main/modules/notification';
import { IWindowPositionType } from '../types';

const api = {
  closeWindows: () => ipcRenderer.send('close-win'),
  hideWindows: () => ipcRenderer.send('hide-win'),
  showOption: () => ipcRenderer.send('show-option'),
  showNotif: (payload: INotifPayload) => ipcRenderer.send('show-notif', payload),
  changeLayout: (payload: IWindowPositionType) => ipcRenderer.send('change-layout', payload),

  setStorage: (key: string, value: object) => ipcRenderer.invoke('storage:set', key, value),
  getStorage: (key: string) => ipcRenderer.invoke('storage:get', key),
  removeStorage: (key: string) => ipcRenderer.invoke('storage:remove', key),

  regStartup: () => ipcRenderer.invoke('reg-startup'),
  deregStartup: () => ipcRenderer.invoke('dereg-startup'),

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
