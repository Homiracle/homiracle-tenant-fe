interface ItfDeeplinkBank {
  appId: string;
  appLogo: string;
  appName: string;
  bankName: string;
  monthlyInstall: number;
  deeplink: string;
}

export interface ItfDeeplink {
  total: number,
  apps: ItfDeeplinkBank[],
}

export interface ItfQrResult {
  code: string,
  desc: string,
  data: { qrCode: string, qrDataURL: string }
}