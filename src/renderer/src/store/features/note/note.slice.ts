import { ENotePriority, ENoteStatus, IError, INote } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { createNote, fetchNotes, updateNote } from '.';

export interface NoteState {
  notes: INote[];
  loading: boolean;
  currentAction: 'create' | 'fetch' | 'update' | 'none';
  errors: IError[];
}

const initialState: NoteState = {
  notes: [],
  loading: false,
  currentAction: 'none',
  errors: [],
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  },
  selectors: {
    selectNotes: (state) => {
      // return state.notes.filter((t) => t.status === ENoteStatus.ON_GOING);
      return state.notes;
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

    builder.addCase(fetchNotes.pending, (state) => {
      state.loading = true;
      state.errors = [];
      state.currentAction = 'fetch';
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = [];
      state.currentAction = 'none';

      // Fix later
      state.notes = action.payload.map((value) => ({
        title: value.title,
        content: value.content,
        id: value.id,
        ref: value.ref,
        // @ts-ignore
        status: value.state,
        folderId: '0000',
        priority: ENotePriority.LOW,
      }));
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
      const idx = state.notes.findLastIndex((note) => note.id == ref);
      if (idx >= 0) state.notes[idx].isLoading = true;
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

      console.log(state.notes[idx]);
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

      state.notes = [...state.notes, newNote];
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
    builder.addCase(createNote.rejected, (state, action) => {
      state.loading = false;
      state.currentAction = 'none';

      const msg = action.payload || { title: 'Fetch notes failed', body: action.error.message };
      state.errors = [msg as IError];

      // const ref = value.ref;
      // TODO: Fix later
      // const idx = state.notes.findLastIndex((note) => note.ref == ref);
      const idx = state.notes.length - 1;
      if (idx >= 0) state.notes.splice(idx, 1);
    });
  },
});

export const {} = noteSlice.actions;
export const { selectFetchingNoteStatus, selectNotes } = noteSlice.selectors;

export default noteSlice.reducer;
