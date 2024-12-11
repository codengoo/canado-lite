import { KeyboardEvent } from 'react';
import { TbCircleDashedCheck, TbCircleX, TbDotsCircleHorizontal } from 'react-icons/tb';
import CreationArea from './components/creation_area';
import TaskArea from './components/task_area';
import { BtnIcon } from './components/ui';

function App(): JSX.Element {
  const closeApp = () => window.api.closeWindows();

  const handleKeyUp = (ev: KeyboardEvent<HTMLInputElement>) => {
    console.log(ev.key);
    if (ev.key == 'Escape') {
      // @ts-ignore
      // ev.target.blur();
      console.log('errer');
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col gap-4 overflow-y-hidden p-5" onKeyUp={handleKeyUp}>
      <div className="flex flex-grow flex-col justify-end gap-2 overflow-hidden">
        <div className="flex flex-none justify-end gap-2">
          <BtnIcon icon={TbDotsCircleHorizontal} className="bg-slate-100/80 hover:bg-slate-100" />
          <BtnIcon icon={TbCircleDashedCheck} className="bg-slate-100/80 hover:bg-slate-100" />
          <BtnIcon
            icon={TbCircleX}
            className="bg-red-100/80 hover:bg-red-100"
            iconClassName="text-red-500"
            onClick={closeApp}
          />
        </div>

        <TaskArea />
      </div>

      <CreationArea />
    </div>
  );
}

export default App;
