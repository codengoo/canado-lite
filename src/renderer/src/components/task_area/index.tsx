import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchNotes, selectFetchingNoteStatus, selectNotes } from '@/store/features/note';
import { useEffect } from 'react';
import { TbLoader2 } from 'react-icons/tb';
import Task from '../task';

export default function TaskArea() {
  const showNotif = window.api.showNotif;
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectNotes);
  const { loading, errors } = useAppSelector(selectFetchingNoteStatus);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  useEffect(() => {
    console.log(loading, errors);

    if (!loading && errors.length > 0) {
      showNotif({
        title: 'Fetch data failed',
        body: errors[0],
      });
    }
  }, [loading]);

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <div className="scrollbar space-y-2 overflow-y-scroll">
      {loading ? (
        <div className="flex items-center gap-2">
          <TbLoader2 className="animate-spin text-gray-500" size={24} />
          <p className="animate-pulse font-semibold text-gray-700">Fetching data from server, please wait...</p>
        </div>
      ) : (
        notes.map((note) => <Task data={note} />)
      )}
    </div>
  );
}
