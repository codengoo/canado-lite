import ActionArea from './components/action_area';
import CreationArea from './components/creation_area';
import TaskArea from './components/task_area';

function App(): JSX.Element {
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
