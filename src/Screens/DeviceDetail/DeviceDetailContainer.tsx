import React from "react";
import { DeviceDetail } from "./DeviceDetail";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Constants/RootStackParam";
import { RootScreens } from "../../Constants/RootScreen";

export type DeviceDetailScreenNavigatorProps = StackScreenProps<
  RootStackParamList,
  RootScreens.DEVICE_DETAIL
>;

export const DeviceDetailContainer = ({route, navigation}: DeviceDetailScreenNavigatorProps) => {
  return <DeviceDetail route={route} navigation={navigation}/>;
}