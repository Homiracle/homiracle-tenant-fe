import { Config } from '../Config';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  BaseQueryFn,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { signout, saveToken } from '../Store/reducers/auth';
import { setUser } from '../Store/reducers';
import { RootState } from '../Store';
import { RoomingHouse } from './rooming-houses/interface';

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    // here you can deal with 401 error
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const { accessToken, refreshToken } = (api.getState() as RootState)
          .auth;
        console.log(api.getState() as RootState);
        const refreshResult = await baseQuery(
          {
            url: 'auth/refresh-token',
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              refreshToken: refreshToken,
            },
          },
          api,
          extraOptions,
        );
        console.log('refreshResult', JSON.stringify(refreshResult));
        if (refreshResult.data) {
          const { access_token, refresh_token } = refreshResult.data as any;
          api.dispatch(
            saveToken({
              accessToken: access_token,
              refreshToken: refresh_token,
            }),
          );
          // retry the initial query
          result = await baseQuery(args, api, {
            headers: {
              Authorization: `Bearer ${() => {(api.getState() as RootState).auth.accessToken}}`,
            },
          });
        } else {
          api.dispatch(signout());
          api.dispatch(setUser({}));
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const API = createApi({
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['RoomingHouse', 'Device'],
  endpoints: () => ({}),
});
