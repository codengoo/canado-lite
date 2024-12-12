import { KeyboardEvent, useEffect } from 'react';
import ActionArea from './components/layout/action_area';
import CreationArea from './components/layout/creation_area';
import FolderArea from './components/layout/folder_area';
import TaskArea from './components/layout/task_area';
import { useAppSelector } from './hooks';
import { selectFetchingNoteStatus } from './store/features/note';
import { selectSetting } from './store/features/setting';

function App(): JSX.Element {
  const showNotif = window.api.showNotif;
  const hideApp = () => window.api.hideWindows();

  const { loading, errors } = useAppSelector(selectFetchingNoteStatus);
  const { layout } = useAppSelector(selectSetting);

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
    <div
      className={
        'flex h-screen w-screen flex-col gap-4 overflow-y-hidden p-5 ' +
        (layout === 'center-bottom' ? 'flex-col' : 'flex-col-reverse')
      }
    >
      <div
        className={
          'flex flex-grow flex-col justify-end gap-2 overflow-hidden ' +
          (layout === 'center-bottom' ? 'flex-col' : 'flex-col-reverse')
        }
      >
        <div className={'flex flex-none justify-between gap-2'}>
          <FolderArea />
          <ActionArea />
        </div>
        <TaskArea />
      </div>

      <CreationArea />
    </div>
  );
}

export default App;
