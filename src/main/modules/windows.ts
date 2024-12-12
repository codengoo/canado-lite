import { app, BrowserWindow, screen } from 'electron';
import { IWindowPositionType } from '../../types';
import { Storage } from './storage';

export function calcPos(windows: BrowserWindow, position: IWindowPositionType) {
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

export async function showWindows(windows: BrowserWindow, first?: boolean) {
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

export function quitApp() {
  app.quit();
}
