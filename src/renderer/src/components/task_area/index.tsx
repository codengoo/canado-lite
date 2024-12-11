import { useAppDispatch } from '@/hooks';
import { createNote } from '@/store/features/note';
import { useEffect } from 'react';
import Task from '../task';

export default function TaskArea() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("asdjfsadfadcajs");
    
    dispatch(createNote({ title: 'abc', content: 'def' }));
  }, []);

  return (
    <div className="scrollbar space-y-2 overflow-y-scroll">
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
    </div>
  );
}
