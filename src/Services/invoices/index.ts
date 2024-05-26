import { API } from '../base';
import { ItfInvoice, ItfInvoiceItem } from './interface';

const invoiceApi = API.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => {
    return {
      /** get current user's invoices */
      getInvoices: build.query<ItfInvoiceItem[], void>({
        query: () => '/invoices',
        transformResponse: (response: ItfInvoice[]) => {
          return response.map((_) => ({
            invoice_id: _.invoice_id,
            name: `Hoá đơn ${_.invoice_id}`,
            status: _.status,
            total: Object.values(_.cost).reduce((a, b) => a + b, 0),
            costs: Object.keys(_.cost).reduce((result: any[], key) => {
              // @ts-ignore
              return [...result, { name: [key], cost: Number(_.cost[key]) }];
            }, []),
          } as unknown as ItfInvoiceItem))
        },
      }),

      /** get specific invoice */
      getDetailInvoice: build.query<ItfInvoiceItem, { id: number }>({
        query: ({ id }) => `/invoices/${id}`,
        transformResponse: (resp: ItfInvoice) => {
          return {
            invoice_id: resp.invoice_id,
            name: `Hoá đơn ${resp.invoice_id}`,
            status: resp.status,
            total: Object.values(resp.cost).reduce((a, b) => a + b, 0),
            costs: Object.keys(resp.cost).reduce((result: any[], key) => {
              // @ts-ignore
              return [...result, { name: [key], cost: Number(resp.cost[key]) }];
            }, []),
          } as unknown as ItfInvoiceItem;
        },
      }),

      /** set specific invoice to PAID status */
      setInvoiceToPaid: build.mutation<void, { id: number }>({
        query: param => ({
          url: `/invoices/${param.id}/confirm_paid`,
          method: 'PATCH'
        }),
      },
      ),
    };
  },
})

export const { useGetInvoicesQuery, useGetDetailInvoiceQuery, useSetInvoiceToPaidMutation } = invoiceApi;