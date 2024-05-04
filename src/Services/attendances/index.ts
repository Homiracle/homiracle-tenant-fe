import { AttendanceStatus } from '@/Constants/AttendanceStatus';
import { API } from '../base';
import { AttendanceData as Attendance } from './type';

const attendanceApi = API.injectEndpoints({
  endpoints: build => ({
    getAcceptedRooms: build.query<
      {
        id: number;
        name: string;
        address: string;
        number_of_devices: number;
        number_of_tenants: number;
      }[],
      AttendanceStatus
    >({
      query: status => `attendances/tenant?src=${status}`,
      transformResponse: (response: Attendance[]) => {
        console.log('hhhhhhhhhhhhhhhhhhhhh');
        return response.map(item => ({
          id: item.attendance.attendance_id,
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
        url: `attendances/${id}`,
        method: 'PATCH',
        body: { status: 'accepted' },
      }),
      invalidatesTags: ['Attendance'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetAcceptedRoomsQuery } = attendanceApi;
