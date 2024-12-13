import { ENotePriority, INote } from '@/types';

export function adaptNote(note: any): INote {
  return {
    title: note.title,
    content: note.content,
    id: note.id,
    ref: note.ref,
    // Fix later
    // @ts-ignore
    status: note.state,
    folderId: '0000',
    priority: ENotePriority.LOW,
  } as INote;
}
