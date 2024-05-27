import { API } from '../base';
export type dataConsumption =[{
    date: string;
    water: number;
    electric: number;
}];
const consumptionApi = API.injectEndpoints({
    endpoints: build => ({
        /* get consumption data */
        getConsumption: build.query<dataConsumption, { roomId: string, start: string, end: string }>({
            query: params => {
                const { roomId, start, end } = params;
                return `/rooms/${roomId}/consumptions?startDate=${start}&endDate=${end}`;
            },
            providesTags: ['Consumption'],
        }),
    }),
    overrideExisting: true,
});

export const { useGetConsumptionQuery } = consumptionApi;