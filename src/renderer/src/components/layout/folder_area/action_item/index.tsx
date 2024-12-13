import { IconType } from 'react-icons';

interface IActionItemProps {
  name: string;
  icon: IconType;
  onClick?: () => void;
}

export default function ActionItem({ name, icon: Icon, onClick }: IActionItemProps) {
  return (
    <div
      className="flex min-w-32 max-w-64 cursor-pointer justify-between gap-2 overflow-x-hidden rounded-sm p-1 px-2 hover:bg-gray-200"
      onClick={onClick}
    >
      <div className="flex flex-grow items-center gap-2 overflow-hidden">
        <button className="flex-none text-gray-400 hover:text-gray-700">
          <Icon className="text-blue-500" />
        </button>

        <p className="flex-grow overflow-hidden text-ellipsis text-nowrap text-xs font-semibold">{name}</p>
      </div>
    </div>
  );
}
