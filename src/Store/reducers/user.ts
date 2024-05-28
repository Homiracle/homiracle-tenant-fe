import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface UserState {
  user_id: string;
  user_name: string;
  password: string;
  email: string;
  role: string;
  isMale: boolean | null;
  date_of_birth: Date | null;
  phone: number | null;
  CID: string | null;
  address: string | null;
}

const initUser = {
  user_id: "",
  user_name: "",
  password: "",
  email: "",
  role: "",
  isMale: null,
  date_of_birth: null,
  phone: null,
  CID: null,
  address: null
}

const slice = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {
    setUser: (state: UserState, { payload: { user } }) => {
      return {
        ...state,
        ...user,
      }
    },
    removeUser: (state: UserState) => {
      return {
        ...state,
        ...initUser,
      }
    },
  },
});


export const selectUser = createSelector(
  (state: {user: UserState}) => state['user'],
  (user: UserState) => user
);

export const selectUserId = createSelector(
  (state: {user: UserState}) => state['user'],
  (user: UserState) => {
    return user.user_id
  }
);

export const { setUser, removeUser } = slice.actions;
export const userReducers = slice.reducer;
