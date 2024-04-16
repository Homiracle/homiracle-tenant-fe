import { API } from '../base';
import {Contract } from './interface'


export type ContractResponse = Partial<Contract> & {
    house_id: string;
  };
  
const contractApi = API.injectEndpoints({
  endpoints: build => ({
    createContract: build.mutation<ContractResponse, Partial<Contract>>({
      query: data => ({
        url: 'rooming-houses',
        method: 'POST',
        body: data,
      }),
    }),

  }),
  overrideExisting: true,
});

export const {
  useCreateContractMutation,
} = contractApi;
