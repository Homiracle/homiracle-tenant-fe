import { Config } from '../../Config';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  BaseQueryFn,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: Config.PREDICTION_URL,
});

const baseQueryWithInterceptor = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log('🚀 ~ >= ~ result:', JSON.stringify(result));
  if (result.error?.status === 401) {
    // here you can deal with 401 error
  }
  return result;
};

export const predictionAPI = createApi({
  reducerPath: 'predictionApi',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['PredictionData'],
  endpoints: () => ({}),
});
