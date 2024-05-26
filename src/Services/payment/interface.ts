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