import { API } from '../base';
import { DeepLinksItf, QrItf } from './interface';

const PaymentApi = API.injectEndpoints({
  endpoints: build => ({
    /** Get bank deeplinks which supported by VietQR */
    getDeeplink: build.query<DeepLinksItf, void>({
      query: () => `payment/deeplinks?os=android`,
    }),

    /** Generate QR Code by VietQR */
    getQRCode: build.query<QrItf, { amount: number }>({
      query: (param) => {
        return {
          method: 'POST',
          url: 'payment/vietqr',
          body: { amount: param.amount }
        }
      }
    })
  }),
  overrideExisting: true,
});

export const { useGetDeeplinkQuery, useGetQRCodeQuery } = PaymentApi;
