import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchNotes, selectFetchingNoteStatus, selectNotes } from '@/store/features/note';
import { useEffect, useRef } from 'react';
import { TbLoader2 } from 'react-icons/tb';
import Task from '../task';

export default function TaskArea() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectNotes);
  const { loading, currentAction } = useAppSelector(selectFetchingNoteStatus);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({ left: 0, top: containerRef?.current.scrollHeight, behavior: 'smooth' });
  }, [notes]);

  return (
    <div className="scrollbar space-y-2 overflow-y-scroll rounded-lg" ref={containerRef}>
      {loading && currentAction === 'fetch' && notes.length === 0 ? (
        <div className="flex items-center gap-2">
          <TbLoader2 className="animate-spin text-gray-500" size={24} />
          <p className="animate-pulse font-semibold text-gray-700">Fetching data from server, please wait...</p>
        </div>
      ) : (
        notes.map((note) => <Task data={note} key={'task_' + note.id} />)
      )}
    </div>
  );
}
