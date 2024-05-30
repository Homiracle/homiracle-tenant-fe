import { API } from '../base';
import { IoTAPI } from './base';
import { ListDevice } from './type';

const deviceApi = API.injectEndpoints({
  endpoints: build => ({
    getDevices: build.query<ListDevice, number>({
      query: (attendance_id) => ({
        url: `iot-devices/tenant?attendance_id=${attendance_id}`,
        method: 'GET',
      }),
      providesTags: ['Device'],
    }),
  }),
  overrideExisting: true,
});

const IotDeviceApi = IoTAPI.injectEndpoints({
  endpoints: build => ({
    getDataIotDevices: build.query<any, string>({
      query: id => `devices/${id}/data/latest`,
      providesTags: ['DeviceData'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetDevicesQuery, useLazyGetDevicesQuery } = deviceApi;
export const { useLazyGetDataIotDevicesQuery } = IotDeviceApi;
