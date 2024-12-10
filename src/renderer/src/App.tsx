import { TbCircleDashedCheck } from 'react-icons/tb'
import CreationArea from './components/creation_area'
import Task from './components/task'
import { BtnIcon } from './components/ui'

function App(): JSX.Element {
  return (
    <div className="p-5 flex flex-col overflow-y-hidden gap-4 h-screen w-screen">
      <div className="flex flex-col justify-end flex-grow gap-2 overflow-hidden">
        <div className="flex justify-end flex-none">
          <BtnIcon icon={TbCircleDashedCheck} className="bg-slate-100/80 hover:bg-slate-100" />
        </div>

        <div className="space-y-2 scrollbar overflow-y-scroll">
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
        </div>
      </div>

      <CreationArea />
    </div>
  )
}

export default App
