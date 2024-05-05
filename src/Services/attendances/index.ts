import { AttendanceStatus } from '@/Constants/AttendanceStatus';
import { API } from '../base';
import { Attendance, AttendanceData, AttendanceDetailResponse } from './type';

const attendanceApi = API.injectEndpoints({
  endpoints: build => ({
    getAcceptedRooms: build.query<
      {
        id: number;
        room_id: string;
        name: string;
        address: string;
        number_of_devices: number;
        number_of_tenants: number;
      }[],
      AttendanceStatus
    >({
      query: status => `attendances/tenant?src=${status}`,
      transformResponse: (response: AttendanceData[]) => {
        return response.map(item => ({
          id: item.attendance.attendance_id,
          room_id: item.attendance.contract.room.room_id,
          name:
            item.attendance.contract.room.rooming_house.name +
            ' - ' +
            item.attendance.contract.room.name,
          address:
            item.attendance.contract.room.rooming_house.address.street +
            ', ' +
            item.attendance.contract.room.rooming_house.address.commune +
            ', ' +
            item.attendance.contract.room.rooming_house.address.district +
            ', ' +
            item.attendance.contract.room.rooming_house.address.province,
          number_of_devices: item.num_of_iot_devices,
          number_of_tenants: item.num_of_attendances,
        }));
      },
      providesTags: ['Attendance'],
    }),
    acceptRoom: build.mutation<Attendance, number>({
      query: id => ({
        url: `attendances/${id}/accept`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Attendance'],
    }),
    denyRoom: build.mutation<Attendance, number>({
      query: id => ({
        url: `attendances/${id}/deny`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Attendance'],
    }),
    getDetailRoom: build.query<AttendanceDetailResponse, number>({
      query: id => `attendances/${id}/tenant`,
      transformResponse: (response: Attendance) => {
        return {
          attendance_id: response.attendance_id,
          landlord: {
            user_name: response.contract.landlord.user_name,
            email: response.contract.landlord.email,
          },
          tenant: {
            user_name: response.contract.tenant.user_name,
            email: response.contract.tenant.email,
          },
          name:
            response.contract.room.rooming_house.name +
            ' - ' +
            response.contract.room.name,
          address:
            response.contract.room.rooming_house.address.street +
            ', ' +
            response.contract.room.rooming_house.address.commune +
            ', ' +
            response.contract.room.rooming_house.address.district +
            ', ' +
            response.contract.room.rooming_house.address.province,
          cost: {
            room_cost: response.contract.cost.room_cost,
            water_cost: response.contract.cost.water_cost,
            power_cost: response.contract.cost.power_cost,
            deposit: response.contract.cost.deposit,
          },
          start_date: response.contract.start_date,
          end_date: response.contract.end_date,
          couting_fee_day: response.contract.couting_fee_day,
          paying_cost_cycle: response.contract.paying_cost_cycle,
          maximum_number_of_peoples:
            response.contract.maximum_number_of_peoples,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAcceptedRoomsQuery,
  useAcceptRoomMutation,
  useDenyRoomMutation,
  useGetDetailRoomQuery,
} = attendanceApi;
