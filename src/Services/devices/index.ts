import { API } from '../base';
import { API as IotAPI } from './base';
import { ListDevice } from './type';

const deviceApi = API.injectEndpoints({
  endpoints: build => ({
    getDevices: build.query<
      ListDevice,
      { accessable_scope: string; accessable_scope_id: string }
    >({
      query: ({ accessable_scope, accessable_scope_id }) => ({
        url: `iot-devices?accessable_scope=${accessable_scope}&accessable_scope_id=${accessable_scope_id}`,
        method: 'GET',
      }),
      providesTags: ['Device'],
    }),
  }),
  overrideExisting: true,
});

const IotDeviceApi = IotAPI.injectEndpoints({
  endpoints: build => ({
    getDataIotDevices: build.query<any, any>({
      query: id => ``,
    }),
  }),
});

export const { useGetDevicesQuery } = deviceApi;
export const { useGetDataIotDevicesQuery } = IotDeviceApi;
