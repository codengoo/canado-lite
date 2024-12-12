import { BtnIcon } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchNotes, selectFetchingNoteStatus } from '@/store/features/note';
import { changeLayout, changeStartUpMode, selectSetting } from '@/store/features/setting';
import { TbCircleDashedCheck, TbCircleX, TbLayout, TbPointerBolt, TbRefresh } from 'react-icons/tb';

export default function ActionArea() {
  const closeApp = () => window.api.closeWindows();
  const dispatch = useAppDispatch();
  const { loading, currentAction } = useAppSelector(selectFetchingNoteStatus);
  const { layout, startUpWithWins } = useAppSelector(selectSetting);

  function handleRefresh() {
    dispatch(fetchNotes());
  }

  function handleChangeLayout() {
    if (layout === 'center-bottom') {
      dispatch(changeLayout('center-top'));
      window.api.changeLayout('center-top');
    } else if (layout === 'center-top') {
      dispatch(changeLayout('center-center'));
      window.api.changeLayout('center-center');
    } else {
      dispatch(changeLayout('center-bottom'));
      window.api.changeLayout('center-bottom');
    }
  }

  async function handleChangeStartUpMode() {
    if (startUpWithWins) {
      const ok = await window.api.deregStartup();
      if (ok) dispatch(changeStartUpMode(false));
    } else {
      const ok = await window.api.regStartup();
      if (ok) dispatch(changeStartUpMode(true));
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
        tooltip="Refresh data"
      />
      <BtnIcon
        icon={TbCircleDashedCheck}
        className="bg-slate-100/80 hover:bg-slate-100"
        size={18}
        tooltip="View finished task"
      />
      <BtnIcon
        icon={TbLayout}
        className="bg-slate-100/80 hover:bg-slate-100"
        size={18}
        onClick={handleChangeLayout}
        tooltip="Change layout"
      />
      <BtnIcon
        icon={TbPointerBolt}
        className="bg-slate-100/80 hover:bg-slate-100"
        size={18}
        onClick={handleChangeStartUpMode}
        tooltip="Start up with windows"
      />
      {/* <BtnIcon icon={TbSettings} className="bg-slate-100/80 hover:bg-slate-100" /> */}
      <BtnIcon
        icon={TbCircleX}
        className="bg-red-100/80 hover:bg-red-100"
        iconClassName="text-red-500"
        onClick={closeApp}
        size={18}
        tooltip="Close windows"
      />
    </div>
  );
}
