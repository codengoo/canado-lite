import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ILayoutType = 'center-bottom' | 'center-top' | 'center-center';
export interface SettingState {
  layout: ILayoutType;
}

const initialState: SettingState = {
  layout: 'center-top',
};

export const settingSlice = createSlice({
  initialState,
  name: 'setting',
  reducers: {
    changeLayout: (state, action: PayloadAction<ILayoutType>) => {
      state.layout = action.payload;
    },
  },
  selectors: {
    selectSetting: (state) => {
      return state;
    },
  },
});

export const { changeLayout } = settingSlice.actions;
export const { selectSetting } = settingSlice.selectors;

export default settingSlice.reducer;
