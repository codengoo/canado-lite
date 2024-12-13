import { is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow, globalShortcut, ipcMain, nativeImage, shell } from 'electron';
import { join } from 'path';
import appIcon from '../../resources/icon.ico?asset';
import { IWindowPositionType } from '../types';
import { Storage } from './modules/storage';

var mainWin: BrowserWindow | null = null;
var optionWin: BrowserWindow | null = null;
var appRunning: boolean = true;

import './ipcs/notif.ipc';
import './ipcs/register.ipc';
import './ipcs/storage.ipc';

import { calcPos, showWindows } from './modules';
import { createTrayInstance } from './modules/tray';

function createOptionWin(): void {
  if (optionWin) {
    optionWin.show();
    return;
  }

  optionWin = new BrowserWindow({
    width: 600,
    height: 400,
    x: 500,
    y: 500,
    icon: nativeImage.createFromPath(appIcon),
    resizable: false,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    optionWin.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    optionWin.loadFile(join(__dirname, '../renderer/index.html'));
  }

  optionWin.on('close', (e) => {
    if (appRunning) {
      // Prevent window from being destroyed
      e.preventDefault();
      optionWin?.hide();
    }
  });
}

function createMainWin(): void {
  mainWin = new BrowserWindow({
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

  mainWin.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  mainWin.on('ready-to-show', () => {
    showWindows(mainWin!, true);
  });

  globalShortcut.register('CmdOrCtrl+Alt+Z', () => {
    showWindows(mainWin!);
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWin.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/option');
  } else {
    mainWin.loadFile(join(__dirname, '../renderer/option.html'));
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    appRunning = false;
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
    if (mainWin) {
      if (mainWin.isMinimized()) mainWin.restore();
      mainWin.focus();
    }
  });

  app.on('ready', () => {
    Storage.getInstance();
    createMainWin();
    createTrayInstance(mainWin!);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWin();
    }
  });

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on('hide-win', () => {
    mainWin?.hide();
    mainWin?.setPosition(0, -1000);
  });

  ipcMain.on('show-option', () => {
    if (optionWin) {
      optionWin.show();
      optionWin.focus();
    } else {
      createOptionWin();
      showWindows(optionWin!, true, 'center-center');
    }
  });

  ipcMain.on('close-win', () => {
    appRunning = false;
    app.quit();
  });

  ipcMain.on('change-layout', (_, payload: IWindowPositionType) => {
    const { x, y } = calcPos(mainWin!, payload);
    mainWin?.setPosition(x, y);
  });
}
