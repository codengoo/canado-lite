import { ipcMain } from 'electron';
import { createNotif, INotifPayload } from '../modules/notification';

ipcMain.on('show-notif', (_, payload: INotifPayload) => {
  createNotif(payload);
});
