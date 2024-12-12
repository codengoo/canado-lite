import { createSlice } from '@reduxjs/toolkit';

export interface SettingState {
  layout: 'center-bottom' | 'center-top';
}

const initialState: SettingState = {
  layout: 'center-bottom',
};

export const settingSlice = createSlice({
  initialState,
  name: 'setting',
  reducers: {},
  selectors: {},
});

export const {} = settingSlice.actions;
export const {} = settingSlice.selectors;

export default settingSlice.reducer;
