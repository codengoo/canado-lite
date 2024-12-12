import { ipcMain } from 'electron';
import { Storage } from '../modules/storage';

ipcMain.handle('storage:set', (_, key: string, value: object) => {
  const storage = Storage.getInstance();
  return storage.setItem(key, value);
});

ipcMain.handle('storage:get', (_, key: string) => {
  const storage = Storage.getInstance();
  return storage.getItem(key);
});

ipcMain.handle('storage:remove', (_, key: string) => {
  const storage = Storage.getInstance();
  return storage.removeItem(key);
});
