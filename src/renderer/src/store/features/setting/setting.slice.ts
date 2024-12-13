import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ILayoutType = 'center-bottom' | 'center-top' | 'center-center';
export type IViewType = 'on-going' | 'completed' | 'all';
export interface SettingState {
  layout: ILayoutType;
  startUpWithWins: boolean;
  currentView: IViewType;
}

const initialState: SettingState = {
  layout: 'center-top',
  startUpWithWins: false,
  currentView: 'on-going',
};

export const settingSlice = createSlice({
  initialState,
  name: 'setting',
  reducers: {
    changeLayout: (state, action: PayloadAction<ILayoutType>) => {
      state.layout = action.payload;
    },
    changeStartUpMode: (state, action: PayloadAction<boolean>) => {
      state.startUpWithWins = action.payload;
    },
    changeCurrentView: (state, action: PayloadAction<IViewType>) => {
      state.currentView = action.payload;
    },
  },
  selectors: {
    selectSetting: (state) => {
      return state;
    },
  },
});

export const { changeLayout, changeStartUpMode, changeCurrentView } = settingSlice.actions;
export const { selectSetting } = settingSlice.selectors;

export default settingSlice.reducer;
