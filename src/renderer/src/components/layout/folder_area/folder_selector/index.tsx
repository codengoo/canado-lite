import { Popup } from '@/components/ui';
import { TbArchiveFilled, TbPlus } from 'react-icons/tb';
import ActionItem from '../action_item';
import FolderItem from '../folder_item';

export default function FolderSelector() {
  const handleAddFolder = () => {
    window.api.showOption();
  };
  return (
    <Popup
      triggerComponent={
        <div className="flex h-[26px] items-center gap-2 rounded-md bg-white p-1 pr-2">
          <TbArchiveFilled className="text-gray-600" size={18} />
          <h1 className="text-xs font-semibold">Default</h1>
        </div>
      }
    >
      <ActionItem name="Add" icon={TbPlus} onClick={handleAddFolder} />
      <FolderItem name="Mon" />
      <FolderItem name="flex flex-col gap-1 rounded-md" />
      <FolderItem name="flex flex-col gap-1 rounded-md flex flex-col gap-1 rounded-md" />
    </Popup>
  );
}
