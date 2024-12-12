import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ILayoutType = 'center-bottom' | 'center-top' | 'center-center';
export interface SettingState {
  layout: ILayoutType;
  startUpWithWins: boolean;
}

const initialState: SettingState = {
  layout: 'center-top',
  startUpWithWins: false,
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
  },
  selectors: {
    selectSetting: (state) => {
      return state;
    },
  },
});

export const { changeLayout, changeStartUpMode } = settingSlice.actions;
export const { selectSetting } = settingSlice.selectors;

export default settingSlice.reducer;
