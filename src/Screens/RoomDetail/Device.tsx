import { DeviceType } from '../../Constants/DeviceType';
import { CardCustom, CardCustomForControlledDevice } from '../../Components';
import { useAppTheme } from '../../Theme';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Switch, Text } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useLazyGetDataIotDevicesQuery,
  useGetDevicesQuery,
  useLazyGetDevicesQuery,
} from '../../Services';
import type { Device } from '../../Services/devices/type';
import { useSocket } from '../../Hooks';
import { useAppDispatch, useAppSelector } from '../../Store/hook';
import {
  DeviceState,
  selectDeviceList,
  setDevice,
  setDeviceArray,
  updateDevice,
} from '../../Store/reducers';
import { AirConditionerMode } from '../DeviceDetail/AirConditionerScreen';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';

export interface DeviceExt extends Device {
  value?: any;
}

export const DeviceComponent = ({
  id,
  navigation,
}: {
  id: number;
  navigation: any;
}) => {
  // hooks
  const theme = useAppTheme();
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const deviceArray = useAppSelector(selectDeviceList);

  const { data: deviceData, isSuccess: deviceSuccess } = useGetDevicesQuery(id);

  const [getDataIotDevices, { data: iotData, isSuccess: iotSuccess }] =
    useLazyGetDataIotDevicesQuery();

  useEffect(() => {
    if (deviceSuccess && deviceData) {
      const fetchIotData = async () => {
        const devicesWithIotData = await Promise.all(
          deviceData.map(async device => {
            const iotResponse = await getDataIotDevices(
              device.device_id as string,
            ).unwrap();
            let value = iotResponse.value || { value: 0 };

            switch (device.type) {
              case DeviceType.AIR_CONDITIONER:
                value = iotResponse.value || {
                  value: 16,
                  status: false,
                  mode: AirConditionerMode.COOL,
                };
                break;
              case DeviceType.FAN:
              case DeviceType.LIGHT:
                value = iotResponse.value || { status: false };
                break;
            }

            return {
              id: device.device_id,
              name: device.name,
              type: device.type,
              value: value,
            };
          }),
        );

        // devicesWithIotData.forEach(device => dispatch(setDevice(device as DeviceState)));
        dispatch(setDeviceArray(devicesWithIotData as DeviceState[]));
        setDataLoaded(true);
      };

      fetchIotData();
    }
  }, [deviceSuccess, deviceData, getDataIotDevices, dispatch]);

  const {
    socketInstance,
    message,
    isConnected,
    connectSocket,
    disconnectSocket,
  } = useSocket();

  useFocusEffect(
    useCallback(() => {
      console.log('Connecting to socket');
      connectSocket();

      return () => {
        console.log('Disconnecting from socket');
        disconnectSocket();
      };
    }, [connectSocket, disconnectSocket]),
  );

  useEffect(() => {
    if (message && dataLoaded) {
      const { deviceId, value } = message;
      dispatch(
        updateDevice({ id: deviceId, value: JSON.parse(value), field: 'all' }),
      );
    }
  }, [message, dataLoaded, dispatch]);

  const handleOnSwitch = (value: boolean, deviceId: string) => {
    if (!socketInstance || !isConnected) {
      console.log('Socket is not connected');
      return;
    }
    dispatch(
      updateDevice({ id: deviceId, value: { status: value }, field: 'status' }),
    );

    const device = deviceArray.find(d => d.id === deviceId) as DeviceState;
    socketInstance.emit('control', {
      deviceId: deviceId,
      value: { ...device.value, status: value },
    });
  };

  const calculate = (deviceList: DeviceState[]) => {
    let sumE = 0;
    let sumW = 0;

    for (const device of deviceList) {
      switch (device.type) {
        case DeviceType.ELECTRIC_METER:
          device.value && (sumE += device.value.value);
          break;
        case DeviceType.WATER_METER:
          device.value && (sumW += device.value.value);
          break;
      }
    }

    return [Math.round(sumE), Math.round(sumW)];
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={{
        paddingHorizontal: wp(2),
        paddingBottom: hp(2),
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
        />
      }
    >
      <View
        style={{
          flexDirection: 'column',
          gap: hp(1),
          paddingBottom: 2,
          paddingHorizontal: 2,
        }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: wp(2) }}>
          {deviceArray.map((device, index) => {
            if (
              device.type === DeviceType.ELECTRIC_METER ||
              device.type === DeviceType.WATER_METER
            ) {
              const [sumE, sumW] = calculate(deviceArray);
              const value =
                device.type === DeviceType.ELECTRIC_METER ? sumE : sumW;
              const unit =
                device.type === DeviceType.ELECTRIC_METER ? 'kWh' : 'm3';
              const icon =
                device.type === DeviceType.ELECTRIC_METER
                  ? 'lightning-bolt-outline'
                  : 'water-outline';
              const title = device.type === DeviceType.ELECTRIC_METER ? 'Điện' : 'Nước';

              return (
                <CardCustom
                  key={index}
                  deviceId={device.id}
                  title={title}
                  value={value}
                  unit={unit}
                  icon={icon}
                />
              );
            }
            return null;
          })}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          gap: hp(1),
          paddingBottom: 2,
          paddingHorizontal: 2,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: wp(2),
            marginTop: hp(2),
          }}
        >
          {deviceArray.map((device, index) => {
            if (
              [
                DeviceType.LIGHT,
                DeviceType.FAN,
                DeviceType.AIR_CONDITIONER,
              ].includes(device.type)
            ) {
              return (
                <CardCustomForControlledDevice
                  key={index}
                  deviceId={device.id}
                  deviceType={device.type}
                  title={device.name}
                  value={device.value?.status || false}
                  onValueChange={(value: boolean) =>
                    handleOnSwitch(value, device.id)
                  }
                  navigation={navigation}
                />
              );
            }
            return null;
          })}
        </View>
      </View>
    </ScrollView>
  );
};
