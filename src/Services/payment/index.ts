import { API } from '../base';
import { ItfDeeplink } from './interface';

const paymentApi = API.injectEndpoints({
  endpoints: build => ({
    getDeepLinks: build.query<ItfDeeplink, { os: string }>({
      query: param => `/payment/deeplinks?os=ios`,
      providesTags: ['Payment'],
    }),
    // getQr: build.query<HouseDetails, string>({
    //   query: id => `rooming-houses/${id}`
    // }),
  }),
  overrideExisting: true,
});

export const { useGetDeepLinksQuery } = paymentApi;
