import { BtnIcon } from '@/components/ui';
import { TbAppleFilled } from 'react-icons/tb';
import FolderSelector from './folder_selector';

export default function FolderArea() {
  return (
    <div className="flex gap-2">
      <FolderSelector />
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
