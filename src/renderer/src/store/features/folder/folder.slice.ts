import { IActionType, IError, IFolder } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FolderState {
  folders: IFolder[];
  currentFolder: IFolder | null;
  loading: boolean;
  currentAction: IActionType;
  errors: IError[];
}

const initialState: FolderState = {
  folders: [],
  currentFolder: null,
  loading: false,
  currentAction: 'none',
  errors: [],
};

export const folderSlice = createSlice({
  initialState,
  name: 'folder',
  reducers: {
    setCurrentFolder: (state, action: PayloadAction<{ id: string }>) => {
      const id = action.payload.id;
      state.currentFolder = state.folders.find((f) => f.id === id) || null;
    },
  },
  selectors: {
    selectCurrentFolder: (state) => state.currentFolder,
    selectAllFolders: (state) => state.folders || [],
  },
});

export const { setCurrentFolder } = folderSlice.actions;
export const { selectAllFolders, selectCurrentFolder } = folderSlice.selectors;

export default folderSlice.reducer;
