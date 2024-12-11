import {
  TbCircleDashedCheck,
  TbCircleX,
  TbDotsCircleHorizontal,
} from 'react-icons/tb';
import CreationArea from './components/creation_area';
import Task from './components/task';
import { BtnIcon } from './components/ui';

function App(): JSX.Element {
  return (
    <div className="flex h-screen w-screen flex-col gap-4 overflow-y-hidden p-5">
      <div className="flex flex-grow flex-col justify-end gap-2 overflow-hidden">
        <div className="flex flex-none justify-end gap-2">
          <BtnIcon
            icon={TbDotsCircleHorizontal}
            className="bg-slate-100/80 hover:bg-slate-100"
          />
          <BtnIcon
            icon={TbCircleDashedCheck}
            className="bg-slate-100/80 hover:bg-slate-100"
          />
          <BtnIcon
            icon={TbCircleX}
            className="bg-red-100/80 hover:bg-red-100"
            iconClassName="text-red-500"
          />
        </div>

        <div className="scrollbar space-y-2 overflow-y-scroll">
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
        </div>
      </div>

      <CreationArea />
    </div>
  );
}

export default App;
