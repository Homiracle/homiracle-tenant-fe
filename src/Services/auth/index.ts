import { API } from '../base';
import { User } from '../users';

export interface userSignin {
  email: string;
  password: string;
}
export interface userSignup {
  email: string;
  password: string;
  user_name: string;
  role: string;
  phone: string
}
export interface userSigninResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

const authApi = API.injectEndpoints({
  endpoints: build => ({
    signin: build.mutation<userSigninResponse, userSignin>({
      query: (credentials: userSignin) => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: any) => {
        return {
          accessToken: response.tokens.access_token,
          refreshToken: response.tokens.refresh_token,
          user: { ...response.user } as User,
        } as userSigninResponse;
      },
      invalidatesTags: ['RoomingHouse', 'User', 'Invoice', 'Device', 'Attendance', 'Payment', 'Consumption'],
    }),
    signUp: build.mutation<userSigninResponse, userSignup>({
      query: (credentials: userSignup) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useSigninMutation, useSignUpMutation } = authApi;
