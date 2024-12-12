import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchNotes, selectFetchingNoteStatus } from '@/store/features/note';
import { TbCircleDashedCheck, TbCircleX, TbLayout, TbRefresh } from 'react-icons/tb';
import { BtnIcon } from '../ui';

export default function ActionArea() {
  const closeApp = () => window.api.closeWindows();
  const dispatch = useAppDispatch();
  const { loading, currentAction } = useAppSelector(selectFetchingNoteStatus);

  function handleRefresh() {
    dispatch(fetchNotes());
  }

  return (
    <div className="space-x-2">
      {/* <BtnIcon icon={TbDotsCircleHorizontal} className="bg-slate-100/80 hover:bg-slate-100" /> */}
      <BtnIcon
        icon={TbRefresh}
        className={'bg-slate-100/80 hover:bg-slate-100'}
        iconClassName={loading && currentAction == 'fetch' ? 'animate-spin' : ''}
        onClick={handleRefresh}
        size={18}
      />
      <BtnIcon icon={TbCircleDashedCheck} className="bg-slate-100/80 hover:bg-slate-100" size={18} />
      <BtnIcon icon={TbLayout} className="bg-slate-100/80 hover:bg-slate-100" size={18} />
      {/* <BtnIcon icon={TbSettings} className="bg-slate-100/80 hover:bg-slate-100" /> */}
      <BtnIcon
        icon={TbCircleX}
        className="bg-red-100/80 hover:bg-red-100"
        iconClassName="text-red-500"
        onClick={closeApp}
        size={18}
      />
    </div>
  );
}
