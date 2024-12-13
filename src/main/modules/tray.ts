import { BrowserWindow, Menu, nativeImage, Tray } from 'electron';
import appIcon from '../../../resources/icon.ico?asset';
import folderIcon from '../../../resources/icons/folder-18-1.5.png?asset';
import logout2Icon from '../../../resources/icons/logout-2-18-1.5.png?asset';
import powerIcon from '../../../resources/icons/power-18-1.5.png?asset';
import optionIcon from '../../../resources/icons/settings-18-1.5.png?asset';
import share3Icon from '../../../resources/icons/share-3-18-1.5.png?asset';
import sharePlayIcon from '../../../resources/icons/shareplay-18-1.5.png?asset';
import { quitApp, showWindows } from './windows';

export function createTrayInstance(windows: BrowserWindow) {
  const tray = new Tray(nativeImage.createFromPath(appIcon));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show app',
      type: 'normal',
      icon: nativeImage.createFromPath(sharePlayIcon),
      click: () => showWindows(windows),
    },
    {
      label: 'Open options',
      type: 'normal',
      icon: nativeImage.createFromPath(optionIcon),
      click: () => showWindows(windows),
    },
    {
      label: 'Share folders',
      type: 'normal',
      icon: nativeImage.createFromPath(share3Icon),
      click: () => showWindows(windows),
    },
    {
      label: 'Current folders',
      type: 'submenu',
      icon: nativeImage.createFromPath(folderIcon),
      submenu: Menu.buildFromTemplate([{ label: 'Default' }]),
    },
    { type: 'separator' },
    { label: 'Exit', type: 'normal', icon: nativeImage.createFromPath(powerIcon), click: () => quitApp() },
    { label: 'Logout', type: 'normal', icon: nativeImage.createFromPath(logout2Icon), click: () => quitApp() },
  ]);
  tray.setToolTip('Nacado app');
  tray.setContextMenu(contextMenu);
  tray.on('double-click', () => showWindows(windows));
}
