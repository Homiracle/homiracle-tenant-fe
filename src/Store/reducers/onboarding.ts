import { createSelector, createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'onboarding',
  initialState: {
    step: 0,
    isShow: true,
  },
  reducers: {
    showOnboarding: state => {
      state.isShow = true;
    },
    hideOnboarding: state => {
      state.isShow = false;
    },
  },
});

export const getShowOnboarding = createSelector(
  (state) => state['onboarding'],
  (onboarding: any) => onboarding.isShow,
)

export const { showOnboarding, hideOnboarding } = slice.actions;
export const onboardingReducers = slice.reducer;