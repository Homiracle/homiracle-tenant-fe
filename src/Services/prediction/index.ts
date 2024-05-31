import { predictionAPI } from './base';

const predictionApi = predictionAPI.injectEndpoints({
  endpoints: build => ({
    getPrediction: build.query({
      query: (params: {
        user_id: string;
        room_id: string;
        end_date: string;
      }) => ({
        url: `api/forecast?user_id=${params.user_id}&room_id=${params.room_id}&end_date=${params.end_date}`,
        method: 'GET',
      }),
      providesTags: ['PredictionData'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetPredictionQuery } = predictionApi;
