import { Popup } from '@/components/ui';
import { TbDots, TbDownload, TbPencilBolt, TbPin, TbShare3, TbShoppingCartFilled, TbTrash } from 'react-icons/tb';
import ActionItem from '../action_item';

interface IFolderItemProps {
  name: string;
}

export default function FolderItem({ name }: IFolderItemProps) {
  return (
    <div className="flex min-w-32 max-w-64 cursor-pointer justify-between gap-2 overflow-x-hidden rounded-sm p-1 px-2 hover:bg-gray-200">
      <div className="flex flex-grow items-center gap-2 overflow-hidden">
        <button className="flex-none text-gray-400 hover:text-gray-700">
          <TbShoppingCartFilled className="text-blue-500" />
        </button>

        <p className="flex-grow overflow-hidden text-ellipsis text-nowrap text-xs font-semibold">{name}</p>
      </div>

      <Popup
        placement="right"
        triggerComponent={
          <div className="flex-none text-gray-400 hover:text-gray-700">
            <TbDots className="" />
          </div>
        }
      >
        <ActionItem name="Share" icon={TbShare3} />
        <ActionItem name="Download" icon={TbDownload} />
        <ActionItem name="Edit" icon={TbPencilBolt} />
        <ActionItem name="Delete" icon={TbTrash} />
      </Popup>

      <button className="flex-none text-gray-400 hover:text-gray-700">
        <TbPin className="" />
      </button>
    </div>
  );
}
