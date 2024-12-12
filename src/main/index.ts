import { is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow, globalShortcut, ipcMain, nativeImage, screen, shell } from 'electron';
import { join } from 'path';
import appIcon from '../../resources/icon.ico?asset';
import { IWindowPositionType } from '../types';
import { createNotif, INotifPayload } from './notification';
import { Storage } from './storage';
var windows: BrowserWindow | null = null;

function calcPos(windows: BrowserWindow, position: IWindowPositionType) {
  const primaryScreen = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryScreen.workAreaSize;

  const windowWidth = windows.getSize()[0] || 100;
  const windowHeight = windows.getSize()[1] || 100;

  switch (position) {
    case 'center-bottom':
      return {
        x: Math.floor((screenWidth - windowWidth) / 2),
        y: screenHeight - windowHeight,
      };

    case 'center-top':
      return {
        x: Math.floor((screenWidth - windowWidth) / 2),
        y: 0,
      };

    case 'center-center':
      return {
        x: Math.floor((screenWidth - windowWidth) / 2),
        y: Math.floor((screenHeight - windowHeight) / 2),
      };

    default:
      return { x: 0, y: 0 };
  }
}

async function readLayoutSetting(): Promise<IWindowPositionType> {
  try {
    const storage = Storage.getInstance();
    const raw = (await storage.getItem('persist__root')) as string;
    const root = JSON.parse(raw);
    const setting = root ? JSON.parse(root.setting) : null;

    return (setting ? setting.layout : 'center-bottom') as IWindowPositionType;
  } catch (error) {
    console.log(error);
    return 'center-bottom';
  }
}

async function showWindows(windows: BrowserWindow, first?: boolean) {
  const layout = await readLayoutSetting();

  const { x, y } = calcPos(windows, layout);

  if (first) {
    windows.setPosition(x, y);
    windows.show();
  } else if (!windows.isVisible()) {
    windows.show();

    setTimeout(() => {
      windows.setPosition(x, y);
      windows.webContents.send('show-win');
    }, 100);
  }
}

function createWindow(): void {
  windows = new BrowserWindow({
    width: 600,
    height: 400,
    icon: nativeImage.createFromPath(appIcon),
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    resizable: false,
    transparent: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  windows.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  windows.on('ready-to-show', () => {
    showWindows(windows!, true);
  });

  globalShortcut.register('CmdOrCtrl+Alt+Z', () => {
    showWindows(windows!);
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    windows.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    windows.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

const gotTheLock = app.requestSingleInstanceLock();

if (process.platform === 'win32') {
  app.setAppUserModelId('Canado');
}

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, argv, workingDir, props) => {
    if (windows) {
      if (windows.isMinimized()) windows.restore();
      windows.focus();
    }
  });

  app.on('ready', () => {
    Storage.getInstance();
    createWindow();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on('close-win', () => {
    app.quit();
  });

  ipcMain.on('hide-win', () => {
    windows?.hide();
    windows?.setPosition(0, -1000);
  });

  ipcMain.on('show-notif', (_, payload: INotifPayload) => {
    createNotif(payload);
  });

  ipcMain.on('change-layout', (_, payload: IWindowPositionType) => {
    const { x, y } = calcPos(windows!, payload);
    windows?.setPosition(x, y);
  });

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
}
