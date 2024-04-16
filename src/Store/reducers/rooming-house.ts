import { createSlice, createSelector } from '@reduxjs/toolkit';

export interface roomingHouseState {
  house_id: string;
  floor_id?: string;
  room_id?: string;
}

const slice = createSlice({
  name: 'roomingHouse',
  initialState: {
    house_id: '',
    floor_id: '',
    room_id: '',
  } as roomingHouseState,
  reducers: {
    storeId: (
      state: roomingHouseState,
      { payload: { field, id } }: { payload: { field: string; id: string } },
    ) => {
      console.log(state)
      return {
        ...state,
        [field]: id,
      };
    },
    resetId: (
      state: roomingHouseState,
      { payload: { field } }: { payload: { field: string } },
    ) => {
      return {
        ...state,
        [field]: '',
      };
    },
  },
});

export const getHouseId = createSelector(
  (state: { roomingHouse: roomingHouseState }) => state['roomingHouse'],
  (roomingHouse: roomingHouseState) => roomingHouse['house_id'],
);

export const getFloorId = createSelector(
  (state: { roomingHouse: roomingHouseState }) => state['roomingHouse'],
  (roomingHouse: roomingHouseState) => roomingHouse['floor_id'],
);

export const getRoomId = createSelector(
  (state: { roomingHouse: roomingHouseState }) => state['roomingHouse'],
  (roomingHouse: roomingHouseState) => roomingHouse['room_id'],
);

export const { storeId, resetId } = slice.actions;
export const roomingHouseReducers = slice.reducer;
