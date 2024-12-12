import { KeyboardEvent, useEffect } from 'react';
import ActionArea from './components/action_area';
import CreationArea from './components/creation_area';
import TaskArea from './components/task_area';
import { useAppSelector } from './hooks';
import { selectFetchingNoteStatus } from './store/features/note';

function App(): JSX.Element {
  const showNotif = window.api.showNotif;
  const hideApp = () => window.api.hideWindows();

  const { loading, errors } = useAppSelector(selectFetchingNoteStatus);

  useEffect(() => {
    if (!loading && errors.length > 0) {
      showNotif({
        title: errors[0].title,
        body: errors[0].body,
      });
    }
  }, [loading]);

  useEffect(() => {
    // @ts-ignore
    window.onkeyup = (ev: KeyboardEvent<HTMLBodyElement>) => {
      console.log(ev.key);
      if (ev.key === 'Escape') {
        const el = document.querySelector('#input_note_title') as HTMLInputElement | null;
        if (el) {
          el.blur();
          el.value = '';
        }
        
        hideApp();
      }
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col gap-4 overflow-y-hidden p-5">
      <div className="flex flex-grow flex-col justify-end gap-2 overflow-hidden">
        <div className="flex flex-none justify-between gap-2">
          <div className="flex gap-2">
            <div className="flex items-center gap-2 rounded-md bg-white p-1 pr-2">
              <h1>🫤</h1>
              <h1 className="text-sm font-semibold">Default</h1>
            </div>

            <div className="flex items-center justify-center gap-2 rounded-md bg-amber-500 p-1">
              <h1 className="w-6">❤️</h1>
            </div>

            <div className="flex items-center justify-center gap-2 rounded-md bg-blue-500 p-1">
              <h1 className="w-6">😎</h1>
            </div>
          </div>
          <ActionArea />
        </div>

        <TaskArea />
      </div>

      <CreationArea />
    </div>
  );
}

export default App;
