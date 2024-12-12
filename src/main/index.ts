import { is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow, globalShortcut, ipcMain, nativeImage, screen, shell } from 'electron';
import { join } from 'path';
import appIcon from '../../resources/icon.ico?asset';
import { createNotif, INotifPayload } from './notification';

var windows: BrowserWindow | null = null;

function calcPos(windows: BrowserWindow) {
  const primaryScreen = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryScreen.workAreaSize;

  const windowWidth = windows.getSize()[0] || 100;
  const windowHeight = windows.getSize()[1] || 100;

  const x = Math.floor((screenWidth - windowWidth) / 2);
  const y = screenHeight - windowHeight;

  return { x, y };
}

function showWindows(windows: BrowserWindow, first?: boolean) {
  if (first) {
    const { x, y } = calcPos(windows);
    windows.setPosition(x, y);
    windows.show();
  } else if (!windows.isVisible()) {
    windows.show();

    setTimeout(() => {
      const { x, y } = calcPos(windows);
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
}
