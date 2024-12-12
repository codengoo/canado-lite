import { BtnIcon } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchNotes, selectFetchingNoteStatus } from '@/store/features/note';
import { changeLayout, selectSetting } from '@/store/features/setting';
import { TbCircleDashedCheck, TbCircleX, TbLayout, TbRefresh } from 'react-icons/tb';

export default function ActionArea() {
  const closeApp = () => window.api.closeWindows();
  const dispatch = useAppDispatch();
  const { loading, currentAction } = useAppSelector(selectFetchingNoteStatus);
  const { layout } = useAppSelector(selectSetting);

  function handleRefresh() {
    dispatch(fetchNotes());
  }

  function handleChangeLayout() {
    if (layout === 'center-bottom') {
      dispatch(changeLayout('center-top'));
      window.api.changeLayout('center-top');
    } else {
      dispatch(changeLayout('center-bottom'));
      window.api.changeLayout('center-bottom');
    }
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
      <BtnIcon icon={TbLayout} className="bg-slate-100/80 hover:bg-slate-100" size={18} onClick={handleChangeLayout} />
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
