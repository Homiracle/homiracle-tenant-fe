import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { User } from '../../Services';

export interface AuthState {
  accessToken: string;
  refreshToken: string;
}

const slice = createSlice({
  name: 'auth',
  initialState: { accessToken: '', refreshToken: '' } as AuthState,
  reducers: {
    saveToken: (state: AuthState, { payload: { accessToken, refreshToken } }) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    signout: state => {
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const selectAuthToken = createSelector(
  (state: { auth: AuthState }) => state['auth'],
  (auth: AuthState) => auth['accessToken'],
);

export const selectRefreshToken = createSelector(
  (state: { auth: AuthState }) => state['auth'],
  (auth: AuthState) => auth['refreshToken'],
);

export const { saveToken, signout } = slice.actions;
export const authReducers = slice.reducer;
