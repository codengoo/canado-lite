import { nativeImage, Notification } from 'electron';
import appIcon from '../../../resources/icon.ico?asset';

export interface INotifPayload {
  title: string;
  body: string;
}

export function createNotif(payload: INotifPayload) {
  new Notification({
    title: payload.title,
    body: payload.body,
    icon: nativeImage.createFromPath(appIcon),
  }).show();
}
