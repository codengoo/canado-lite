import { BtnIcon } from '@/components/ui';
import { TbAppleFilled, TbArchiveFilled } from 'react-icons/tb';

export default function FolderArea() {
  return (
    <div className="flex gap-2">
      <div className="relative flex h-[26px] items-center gap-2 rounded-md bg-white p-1 pr-2">
        <TbArchiveFilled className="text-gray-600" size={18} />
        <h1 className="text-xs font-semibold">Default</h1>

        <div className="absolute left-0 top-8 h-40 w-40 bg-white"></div>
      </div>

      <BtnIcon
        icon={TbAppleFilled}
        iconClassName="text-red-600"
        size={18}
        className="bg-yellow-400 hover:bg-yellow-400"
        tooltip="My folder area"
      />
    </div>
  );
}
