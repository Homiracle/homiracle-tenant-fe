import React from 'react';
import { RoomDetail } from './RoomDetail';
import { RootStackParamList } from '../../Constants/RootStackParam';
import { RootScreens } from '../../Constants/RootScreen';
import { StackScreenProps } from '@react-navigation/stack';

export type RoomDetailScreenNavigatorProps = StackScreenProps<
  RootStackParamList,
  RootScreens.ROOM_DETAIL
>;

export const RoomDetailContainer = ({
  route,
  navigation,
}: RoomDetailScreenNavigatorProps) => {
  return <RoomDetail route={route} navigation={navigation} />;
};
