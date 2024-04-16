import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

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
  initialState: { user: initUser },
  reducers: {
    setUser: (state, { payload: { ...user } }) => {
      state.user = user;
    },
  },
});

export const selectUserId = (state: RootState) => state.user.user?.user_id;

export const { setUser } = slice.actions;
export const userReducers = slice.reducer;
