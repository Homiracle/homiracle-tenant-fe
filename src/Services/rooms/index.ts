import { API } from '../base';
import { ListRoom, RoomDetail } from './type';

export type Room = {
  name: string;
  acreage: number;
  number_of_bedroom: number;
  number_of_bathroom: number;
  max_number_of_tenant?: number;
  floor: {
    floor_id: string;
  };
  reference_cost: {
    deposit?: number;
    room_cost?: number;
    water_cost?: number;
    power_cost?: number;
    cost_per_person?: number;
    cost_per_room?: number;
  };
  [key: string]: any;
};

export type RoomResponse = Partial<Room> & {
  floor_id: string;
};

const RoomApi = API.injectEndpoints({
  endpoints: build => ({
    createRoom: build.mutation<RoomResponse, Partial<Room>>({
      query: data => ({
        url: 'Rooms',
        method: 'POST',
        body: data,
      }),
    }),
    getRooms: build.query<ListRoom, { house_id: string; floor_id: string }>({
      query: ({ house_id, floor_id }) =>
        `rooms?roomingHouseId=${house_id}&floorId=${floor_id}`,
    }),
    getRoom: build.query<RoomDetail, String>({
      query: id => `rooms/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useCreateRoomMutation, useGetRoomsQuery, useGetRoomQuery } =
  RoomApi;
