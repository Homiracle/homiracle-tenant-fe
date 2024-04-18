export * from './InvoiceItem'

export interface ItfInvoiceMoney {
  name: string,
  amount: string,
  price: string | number
}

export interface ItfInvoiceItem {
  id: string,
  name: string,
  price: number | string,
  paidStatus: boolean,
  detail: ItfInvoiceMoney[]
}