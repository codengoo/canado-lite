import { ipcMain } from 'electron';
import { createNotif, deregisterStartUp, registerStartUp } from '../modules';

ipcMain.handle('reg-startup', async () => {
  const ok = await registerStartUp();
  if (!ok) createNotif({ title: 'Register startup with windows failed', body: 'Register failed' });
  else createNotif({ title: 'Register startup with windows successfully', body: 'Register successfully' });

  return ok;
});

ipcMain.handle('dereg-startup', async () => {
  const ok = await deregisterStartUp();
  if (!ok) createNotif({ title: 'Deregister startup with windows failed', body: 'Deregister failed' });
  else createNotif({ title: 'Deregister startup with windows successfully', body: 'Deregister successfully' });

  return ok;
});
