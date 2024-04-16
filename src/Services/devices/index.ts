import { API } from '../base';
import { CreateDevice, CreateDeviceResponse, ListDevice } from './type';

const deviceApi = API.injectEndpoints({
  endpoints: build => ({
    createDevice: build.mutation<CreateDevice, Partial<CreateDeviceResponse>>({
      query: data => ({
        url: 'iot-devices',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Device'],
    }),
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

export const { useCreateDeviceMutation, useGetDevicesQuery } = deviceApi;
