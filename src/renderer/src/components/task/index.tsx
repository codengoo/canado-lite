import { ENotePriority, INote } from '@/types';
import {
  TbAlertCircleFilled,
  TbCircleArrowDownFilled,
  TbCircleArrowUpFilled,
  TbLoader2,
  TbSquareRoundedCheck,
} from 'react-icons/tb';
import { BtnIcon } from '../ui';

interface ITaskProps {
  data: INote;
}

export default function Task({ data }: ITaskProps) {
  return (
    <div
      className={
        'group flex w-full cursor-pointer items-center gap-4 rounded-lg border-2 border-transparent bg-gray-100/80 p-4 transition-all hover:bg-white hover:shadow-xl ' +
        (data.priority === ENotePriority.LOW
          ? 'hover:hover:border-green-600'
          : data.priority === ENotePriority.HIGH
            ? 'hover:border-red-600'
            : 'hover:border-yellow-600')
      }
    >
      {data.isLoading ? (
        <TbLoader2 className="animate-spin text-gray-500" size={24} />
      ) : data.priority === ENotePriority.LOW ? (
        <BtnIcon icon={TbCircleArrowDownFilled} iconClassName="text-green-600" />
      ) : data.priority === ENotePriority.HIGH ? (
        <BtnIcon icon={TbAlertCircleFilled} iconClassName="text-red-600" />
      ) : (
        <BtnIcon icon={TbCircleArrowUpFilled} iconClassName="text-yellow-600" />
      )}

      <div className="flex-grow">
        <h1 className="font-semibold">{data.title}</h1>
        <p className="text-sm">{data.content}</p>
      </div>

      <BtnIcon
        icon={TbSquareRoundedCheck}
        className="self-start opacity-0 group-hover:opacity-100"
        iconClassName="text-gray-400"
      />
    </div>
  );
}
