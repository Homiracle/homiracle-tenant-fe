import { RootScreens } from './RootScreen';

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.ONBOARDING]: undefined;
  [RootScreens.SIGNIN]: undefined;
  [RootScreens.SIGNUP]: undefined;
  [RootScreens.HOME]: undefined;
  [RootScreens.INVOICE]: undefined;
  [RootScreens.FINANCE]: undefined;
  [RootScreens.PROFILE]: undefined;
  [RootScreens.NOTIFICATION]: undefined;
  [RootScreens.ROOM]: undefined;
  AuthStack: undefined;
  HomeStack: undefined;
  RoomStack: undefined;
  FinanceStack: undefined;
  NotificationStack: undefined;
  ProfileStack: undefined;
  OnboardingStack: undefined;
  TabNavigator: undefined;
};
