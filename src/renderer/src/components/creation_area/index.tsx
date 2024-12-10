import { TbGrain, TbSend2 } from 'react-icons/tb'
import { BtnIcon } from '../ui'

export default function CreationArea() {
  return (
    <div className="bg-white rounded-xl shadow-lg flex gap-2 flex-none">
      <BtnIcon icon={TbGrain} className="draggable pl-4" />
      
      <div className="flex gap-2 p-4 pl-0 flex-grow">
        <input
          placeholder="Insert task"
          className="flex-grow bg-transparent outline-none font-semibold placeholder:font-normal placeholder:text-gray-500 no-draggable"
        />
        <BtnIcon icon={TbSend2} />
      </div>
    </div>
  )
}
