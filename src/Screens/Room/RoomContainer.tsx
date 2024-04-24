import { StackScreenProps } from '@react-navigation/stack';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';
import { Room } from './Room';
import React from 'react';

export type RoomScreenNavigatorProps = StackScreenProps<
  RootStackParamList,
  RootScreens.ROOM
>;

export const RoomContainer = ({
  route,
  navigation,
}: RoomScreenNavigatorProps) => {
  return <Room route={route} navigation={navigation}/>;
};
