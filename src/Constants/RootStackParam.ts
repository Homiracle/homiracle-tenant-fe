import { DeviceType } from './DeviceType';
import { RootScreens } from './RootScreen';

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.ONBOARDING]: undefined;
  [RootScreens.SIGNIN]: undefined;
  [RootScreens.SIGNUP]: undefined;
  [RootScreens.HOME]: undefined;
  [RootScreens.INVOICE]: { invoice_id: number };
  [RootScreens.FINANCE]: undefined;
  [RootScreens.PROFILE]: undefined;
  [RootScreens.NOTIFICATION]: undefined;
  [RootScreens.ROOM]: undefined;
  [RootScreens.PAYMENT]: undefined;
  [RootScreens.ROOM_DETAIL]: { attendance_id: number; room_id: string, name: string, screenName?: string};
  [RootScreens.DEVICE_DETAIL]: { device_id: string; device_type: DeviceType; device_name: string };
  AuthStack: undefined;
  HomeStack: undefined;
  RoomStack: undefined;
  FinanceStack: undefined;
  NotificationStack: undefined;
  ProfileStack: undefined;
  OnboardingStack: undefined;
  TabNavigator: undefined;
};
