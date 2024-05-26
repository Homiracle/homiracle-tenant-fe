export interface DeepLinksItf {
  total: number,
  apps: Array<{
    appId: string,
    appLogo: string,
    appName: string,
    bankName: string,
    deeplink: string,
    monthlyInstall: number
  }>
}

export interface QrItf {
  code: string,
  desc: string,
  data: {
    qrCode: string,
    qrDataURL: string,
  }
}