import { API } from '../base';

export interface Address {
  province: string;
  district: string;
  commune: string;
  street: string;
}

export interface User {
  email: string;
  user_name: string;
  user_id: string;
  phone: string;
  CID: string;
  date_of_birth: string;
  isMale: boolean;
  role: 'landlord' | 'tenant';
}

const userApi = API.injectEndpoints({
  endpoints: build => ({
    getUser: build.query<User, string>({
      query: id => `users/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetUserQuery } = userApi;
