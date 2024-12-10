import { TbCircleArrowDownFilled, TbSquareRoundedCheck } from 'react-icons/tb'
import { BtnIcon } from '../ui'

export default function Task() {
  return (
    <div className="bg-gray-100/80 w-full rounded-lg p-4 hover:bg-white transition-all cursor-pointer flex gap-4 items-center border-2 border-transparent hover:hover:border-green-600 hover:shadow-xl group">
      <BtnIcon icon={TbCircleArrowDownFilled} iconClassName="text-green-600" />
      <h1 className="flex-grow">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</h1>
      <BtnIcon
        icon={TbSquareRoundedCheck}
        className="opacity-0 group-hover:opacity-100 self-start"
        iconClassName="text-gray-400"
      />
    </div>
  )
}
