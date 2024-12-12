import { BrowserWindow, Menu, nativeImage, Tray } from 'electron';
import appIcon from '../../../resources/icon.ico?asset';
import showIcon from '../../../resources/icons/device-tv-20-1.5.png?asset';
import powerIcon from '../../../resources/icons/power-20-1.5.png?asset';
import { quitApp, showWindows } from './windows';

export function createTrayInstance(windows: BrowserWindow) {
  const tray = new Tray(nativeImage.createFromPath(appIcon));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      type: 'normal',
      icon: nativeImage.createFromPath(showIcon),
      click: () => showWindows(windows),
    },
    { type: 'separator' },
    { label: 'Exit', type: 'normal', icon: nativeImage.createFromPath(powerIcon), click: () => quitApp() },
  ]);
  tray.setToolTip('Nacado app');
  tray.setContextMenu(contextMenu);
  tray.on('double-click', () => showWindows(windows));
}
