import React from 'react';
import { DeviceDetailScreenNavigatorProps } from './DeviceDetailContainer';
import {
  AirConditionerScreen,
  AirConditionerMode as Mode,
} from './AirConditionerScreen';
import { DeviceState, selectDeviceById } from '../../Store/reducers';
import { useAppSelector } from '../../Store/hook';
import { Header } from '../../Components';
import { View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { DeviceType } from '../../Constants/DeviceType';

export const DeviceDetail = ({
  route,
  navigation,
}: DeviceDetailScreenNavigatorProps) => {
  const name = route.params.device_name;
  const deviceId = route.params.device_id;
  const deviceType = route.params.device_type;
  const setDeviceArray = route.params.setDeviceArray;

  const device = useAppSelector(selectDeviceById(deviceId));
  // console.log("🚀 ~ device:", device?.value)

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={name}
        height={heightPercentageToDP(2)}
        onBack={() => navigation.goBack()}
        mode='center-aligned'
      />
      {device && deviceType === DeviceType.AIR_CONDITIONER && (
        <AirConditionerScreen
          id={deviceId}
          name={name}
          value={device.value}
          navigation={navigation}
          setDeviceArray={setDeviceArray!} // Add '!' to assert that setDeviceArray is not undefined
        />
      )}
    </View>
  );
};
