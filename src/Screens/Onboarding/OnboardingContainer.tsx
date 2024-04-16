import React from 'react';
import { Onboarding } from './Onboarding';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Constants/RootStackParam';
import { RootScreens } from '../../Constants/RootScreen';

type OnboardingScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING
>;

export const OnboardingContainer = ({
  navigation,
}: OnboardingScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Onboarding onNavigate={onNavigate} />;
};
