import { API } from '../base';
import { DeepLinksItf } from './interface';

const PaymentApi = API.injectEndpoints({
  endpoints: build => ({
    getDeeplink: build.query<DeepLinksItf, void>({
      query: () => `payment/deeplinks?os=android`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetDeeplinkQuery } = PaymentApi;
