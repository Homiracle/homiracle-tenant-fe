import React from 'react';
import { Home } from './Home';
import { RootStackParamList } from '../../Constants/RootStackParam';
import { RootScreens } from '../../Constants/RootScreen';
import { StackScreenProps } from '@react-navigation/stack';

export type HomeScreenNavigatorProps = StackScreenProps<
  RootStackParamList,
  RootScreens.HOME
>;

export const HomeContainer = ({
  route,
  navigation,
}: HomeScreenNavigatorProps) => {
  return <Home route={route} navigation={navigation} />;
};
