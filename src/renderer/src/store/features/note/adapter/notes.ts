import { ENotePriority, ENoteStatus, INote } from '@/types';
import { v4 as uuid } from 'uuid';

export function adaptNote(note: any): INote {
  return {
    title: note.title,
    content: note.content,
    id: note.id || uuid(),
    ref: note.ref || uuid(),
    // Fix later
    // @ts-ignore
    status: note.state || ENoteStatus.ON_GOING,
    folderId: note.folderId || '0000',
    priority: note.priority || ENotePriority.LOW,
    isLoading: note.isLoading || false,
    isShow: note.isShow || true,
  } as INote;
}
