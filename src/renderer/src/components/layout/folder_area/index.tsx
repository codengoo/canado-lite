import { TbAppleFilled, TbArchiveFilled } from 'react-icons/tb';

export default function FolderArea() {
  return (
    <div className="flex gap-2">
      <div className="flex items-center gap-2 rounded-md bg-white p-1 pr-2 h-[26px]">
        <TbArchiveFilled className="text-gray-600" size={18} />
        <h1 className="text-xs font-semibold">Default</h1>
      </div>

      <div className="flex h-fit w-fit items-center justify-center gap-1 rounded-md bg-yellow-200 p-1">
        <TbAppleFilled className="text-red-600" size={18} />
      </div>
    </div>
  );
}
