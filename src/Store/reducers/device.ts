import { DeviceType } from '../../Constants/DeviceType';
import { createSlice, createSelector } from '@reduxjs/toolkit';

export interface DeviceState {
  id: string;
  name: string;
  type: DeviceType;
  value: any;
}

const slice = createSlice({
  name: 'device',
  initialState: [] as DeviceState[],
  reducers: {
    setDevice: (state, { payload }: { payload: DeviceState }) => {
      if (state.findIndex(device => device.id === payload.id) !== -1) {
        return;
      }
      state.push(payload);
    },
    updateDevice: (state, { payload: { id, value, field } }) => {
      const index = state.findIndex(device => device.id === id);
      if (index !== -1) {
        if (field === 'all') {
          state[index].value = value;
          return;
        }
        state[index].value = {
          ...state[index].value,
          [field]: value[field],
        };
      }
      // console.log(state);
    },
    clearDevices: () => [],
  },
});

export const selectDeviceById = (id: string) =>
  createSelector(
    (state: { device: DeviceState[] }) => state.device,
    (devices: DeviceState[]) => devices.find(device => device.id === id),
  );

export const selectDeviceList = createSelector(
  (state: { device: DeviceState[] }) => state['device'],
  (devices: DeviceState[]) => devices,
);

export const { setDevice, updateDevice, clearDevices } = slice.actions;
export const deviceReducers = slice.reducer;
