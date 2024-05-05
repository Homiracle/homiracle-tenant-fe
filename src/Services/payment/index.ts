import { API } from '../base';
import { ItfDeeplink, ItfQrResult } from './interface';

const paymentApi = API.injectEndpoints({
  endpoints: build => ({
    /* get deeplinks of supported banks */
    getDeepLinks: build.query<ItfDeeplink, { os: string }>({
      query: param => {
        return `/payment/deeplinks?os=${param.os}`
      },
      providesTags: ['Payment'],
    }),
    /* generate VietQR */
    getQr: build.mutation<ItfQrResult, { amount: number }>({
      invalidatesTags: ['Payment'],
      query: param => ({
        method: 'POST',
        url: '/payment/vietqr',
        body: { amount: param.amount },
      })
    }),
  }),
  overrideExisting: true,
});

export const { useGetDeepLinksQuery, useGetQrMutation } = paymentApi;
