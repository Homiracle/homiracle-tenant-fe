export enum InvoiceStatus {
  CREATED = 'created',
  PAID = 'paid',
  LOANED = 'loaned',
  EXPIRED = 'expired',
  PAIDCONFIRMED = 'paidConfirmed',
}

export enum InvoiceStatusText {
  CREATED = 'Chưa thanh toán',
  PAID = 'Đã thanh toán',
  LOANED = 'Ghi nợ',
  EXPIRED = 'Đã hết hạn',
  PAIDCONFIRMED = 'Đã xác nhận',
}

export enum PaymentName {
  room_cost = 'Tiền phòng',
  water_cost = 'Tiền nước',
  power_cost = 'Tiền điện',
}