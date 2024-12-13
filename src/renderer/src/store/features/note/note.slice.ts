import { RootState } from '@/store/store';
import { ENotePriority, ENoteStatus, IError, INote } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { createNote, fetchNotes, updateNote } from '.';
import { adaptNote } from './adapter/notes';

export interface NoteState {
  notes: INote[];
  comp_notes: INote[];
  all_notes: INote[];
  on_notes: INote[];
  loading: boolean;
  currentAction: 'create' | 'fetch' | 'update' | 'none';
  errors: IError[];
}

const initialState: NoteState = {
  notes: [],
  on_notes: [],
  all_notes: [],
  comp_notes: [],
  loading: false,
  currentAction: 'none',
  errors: [],
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  selectors: {
    selectNotes: (state) => {
      return state.notes || [];
    },

    selectFetchingNoteStatus: (state) => ({
      loading: state.loading,
      errors: state.errors,
      currentAction: state.currentAction,
    }),
  },

  extraReducers: (builder) => {
    /**
     * Build for fetching notes
     *
     */

    builder.addCase(fetchNotes.pending, (state, action) => {
      state.loading = true;
      state.errors = [];
      state.currentAction = 'fetch';
    });

    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = [];
      state.currentAction = 'none';

      const status = action.meta.arg.status;

      switch (status) {
        case ENoteStatus.COMPLETED:
          state.comp_notes = action.payload.map((value) => adaptNote(value));
          break;
        case ENoteStatus.ON_GOING:
          state.on_notes = action.payload.map((value) => adaptNote(value));
          break;
        default:
          state.all_notes = action.payload.map((value) => adaptNote(value));
          break;
      }
    });

    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.loading = false;
      state.currentAction = 'none';

      const msg = action.payload || { title: 'Fetch notes failed', body: action.error.message };
      state.errors = [msg as IError];
    });

    /**
     * Build for updating notes
     *
     */

    builder.addCase(updateNote.pending, (state, action) => {
      state.loading = true;
      state.errors = [];
      state.currentAction = 'update';

      const ref = action.meta.arg.id;
      const status = action.meta.arg.status;

      if (status && status == ENoteStatus.COMPLETED) {
        const idx = state.on_notes.findLastIndex((note) => note.id == ref);
        if (idx < 0) return;

        state.on_notes[idx].isLoading = true;
        const tmp = state.on_notes[idx];

        state.comp_notes.push(tmp);
        state.on_notes.splice(idx, 1);
      } else if (status && status == ENoteStatus.ON_GOING) {
        const idx = state.comp_notes.findLastIndex((note) => note.id == ref);
        if (idx < 0) return;

        state.comp_notes[idx].isLoading = true;
        const tmp = state.comp_notes[idx];

        state.on_notes.push(tmp);
        state.comp_notes.splice(idx, 1);
      } else {
        // const idx = state.on_notes.findLastIndex((note) => note.id == ref);
        // if (idx < 0) return;
      }
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.loading = false;
      state.currentAction = 'none';
      const value = action.payload;
      const ref = value.id;
      const idx = state.notes.findLastIndex((note) => note.id == ref);

      if (idx >= 0)
        state.notes[idx] = {
          title: value.title,
          content: value.content,
          id: value.id,
          ref: value.ref,
          // @ts-ignore
          status: value.state,
          folderId: '0000',
          priority: ENotePriority.LOW,
          isLoading: false,
        };
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      state.loading = false;
      state.currentAction = 'none';

      const msg = action.payload || { title: 'Fetch notes failed', body: action.error.message };
      state.errors = [msg as IError];
    });

    /**
     * Build for creating notes
     *
     */
    builder.addCase(createNote.pending, (state, action) => {
      state.loading = true;
      state.currentAction = 'create';
      const payload = action.meta.arg;
      const newNote: INote = {
        title: payload.title,
        content: payload.content,
        folderId: '0000',
        id: '0000',
        priority: ENotePriority.LOW,
        ref: uuid(),
        status: ENoteStatus.ON_GOING,
        isLoading: true,
      };

      state.on_notes = [...state.on_notes, newNote];
    });

    builder.addCase(createNote.fulfilled, (state, action) => {
      state.loading = false;
      state.currentAction = 'none';
      const value = action.payload;
      // const ref = value.ref;
      // TODO: Fix later
      // const idx = state.notes.findLastIndex((note) => note.ref == ref);
      const idx = state.notes.length - 1;

      if (idx >= 0)
        state.on_notes[idx] = {
          title: value.title,
          content: value.content,
          id: value.id,
          ref: value.ref,
          // @ts-ignore
          status: value.state,
          folderId: '0000',
          priority: ENotePriority.LOW,
          isLoading: false,
        };
    });

    builder.addCase(createNote.rejected, (state, action) => {
      state.loading = false;
      state.currentAction = 'none';

      const msg = action.payload || { title: 'Fetch notes failed', body: action.error.message };
      state.errors = [msg as IError];

      // const ref = value.ref;
      // TODO: Fix later
      // const idx = state.notes.findLastIndex((note) => note.ref == ref);
      const idx = state.on_notes.length - 1;
      if (idx >= 0) state.notes.splice(idx, 1);
    });
  },
});

export const {} = noteSlice.actions;
export const { selectFetchingNoteStatus } = noteSlice.selectors;

export const selectNotes = (state: RootState) => {
  const currentView = state.setting.currentView;

  switch (currentView) {
    case 'all':
      return state.note.all_notes;
    case 'completed':
      return state.note.comp_notes;
    case 'on-going':
      return state.note.on_notes;
    default:
      return state.note.on_notes;
  }
};

export default noteSlice.reducer;
