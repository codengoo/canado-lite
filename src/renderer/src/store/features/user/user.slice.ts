import { IActionType, IError, IUser } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  user: IUser | null;
  loading: boolean;
  currentAction: IActionType;
  errors: IError[];
}

const initialState: UserState = {
  user: null,
  loading: false,
  currentAction: 'none',
  errors: [],
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {},
  selectors: {
    selectLoginStatus: (state) => {
      return {
        isLogin: !!state.user,
      };
    },
    selectUser: (state) => {
      return state.user;
    },
  },
});

export const {} = userSlice.actions;
export const { selectLoginStatus: isLogin } = userSlice.selectors;

export default userSlice.reducer;
