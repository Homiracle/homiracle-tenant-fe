import { InvoiceStatus } from "../../../Constants/Invoice"

export interface ItfInvoice {
  invoice_id: number,
  status: InvoiceStatus,
  start_paid_day: number,
  end_paid_day: number,
  type: any,
  total: number,
  cost: {
    cost_per_person: number,
    cost_per_room: number,
    deposit: number,
    power_cost: number,
    room_cost: number,
    water_cost: number,
  },
  attendances: Array<{
    attendance_id: number,
    attendance_date: string,
    status: string,
    end_date: any,
    tenant: any,
  }>
}

export interface ItfInvoiceItem {
  invoice_id: number,
  status: InvoiceStatus,
  name: string,
  start_paid_day?: 20,
  end_paid_day?: 25,
  landlord?: { user_id: string, user_name: string },
  tenant?: { user_id: string, user_name: string },
  total: number,
  costs: Array<{ name: string, cost: number }>,
  attendances: any[],
  additions: any[],
  loans: any[]
}