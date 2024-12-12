import { app } from 'electron';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export async function registerStartUp() {
  try {
    const appName = 'Nacado';
    const exePath = app.getPath('exe');
    const registryKey = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
    const command = `reg add "${registryKey}" /v "${appName}" /t REG_SZ /d ${exePath} /f`;

    const status = await execAsync(command);
    return status.stderr === '';
  } catch (error) {
    return false;
  }
}

export async function deregisterStartUp() {
  try {
    const appName = 'Nacado';
    const registryKey = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
    const removeCommand = `reg delete "${registryKey}" /v "${appName}" /f`;

    const status = await execAsync(removeCommand);
    return status.stderr === '';
  } catch (error) {
    return false;
  }
}
