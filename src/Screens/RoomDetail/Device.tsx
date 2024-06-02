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
  // constants

  // hooks
  const theme = useAppTheme();
  // const [deviceArray, setDeviceArray] = useState<DeviceExt[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const deviceArray = useAppSelector(selectDeviceList);

  /**
   * Fetch device data
   */
  const {
    data: deviceData,
    isSuccess: deviceSuccess,
    isLoading: deviceLoading,
    error: deviceError,
  } = useGetDevicesQuery(id);

  const [getDevices, { isSuccess: _deviceSuccess, data: _deviceData }] =
    useLazyGetDevicesQuery();

  /**
   * Fetch iot data from iot server
   */
  const [
    getDataIotDevices,
    {
      data: iotValue,
      isSuccess: iotSuccess,
      isLoading: iotLoading,
      error: iotError,
    },
  ] = useLazyGetDataIotDevicesQuery();

  const calculate = (deviceList: DeviceState[]) => {
    if (deviceArray.length > 0) {
      let sumE = 0;
      let sumH = 0;
      let sumT = 0;
      let sumW = 0;

      for (const device of deviceList) {
        switch (device.type) {
          case DeviceType.ELECTRIC_METER:
            device.value && (sumE += device.value.value);
            break;

          case DeviceType.WATER_METER:
            device.value && (sumW += device.value.value);
            break;

          default:
            break;
        }
      }

      return [
        Math.round(sumE),
        Math.round(sumH),
        Math.round(sumT),
        Math.round(sumW),
      ];
    }
    return [0, 0, 0, 0];
  };

  /**
   * listen to device data change
   */

  useEffect(() => {
    if (deviceSuccess && deviceData) {
      const devices = deviceData.map(device => {
        let value = {};

        switch (device.type) {
          case DeviceType.ELECTRIC_METER:
          case DeviceType.WATER_METER:
            value = { value: 0 };
            break;

          case DeviceType.AIR_CONDITIONER:
            value = { value: 16, status: false, mode: AirConditionerMode.COOL};
            break;

          case DeviceType.FAN:
            value = { status: false };
            break;

          case DeviceType.LIGHT:
            value = { status: false };
            break;

          default:
            break;
        }

        return {
          id: device.device_id,
          name: device.name,
          type: device.type,
          value: value,
        };
      }) as DeviceState[];

      if (devices.length > 0) {
        for (const device of devices) {
          dispatch(setDevice(device));
        }
      }
      setDataLoaded(true);
      // runPromise(devices);
    }
  }, [deviceSuccess, deviceData]);

  useEffect(() => {
    if (_deviceSuccess && _deviceData) {
      setDataLoaded(false);
      console.log(deviceArray);
      const devices = _deviceData.map(device => {
        const index = deviceArray.findIndex(d => d.id === device.device_id);
        if (index === -1) {
          return {
            id: device.device_id,
            name: device.name,
            type: device.type,
            value: null,
          };
        } else {
          return deviceArray[index];
        }
      }) as DeviceState[];
      if (devices.length > 0) {
        for (const device of devices) {
          dispatch(setDevice(device));
        }
      }
      // setDataLoaded(true);
      // runPromise(devices);
    }
  }, [_deviceSuccess, _deviceData]);

  /**
   * listen to iot data change
   */
  const {
    socketInstance,
    message,
    isConnected,
    connectSocket,
    disconnectSocket,
  } = useSocket();

  // Handle socket reconnection using useFocusEffect
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
      console.log('🚀 ~ useEffect ~ value:', value);
      dispatch(
        updateDevice({ id: deviceId, value: JSON.parse(value), field: 'all' }),
      );
    }
  }, [message]);

  /**
   * handle on switch
   */
  const handleOnSwitch = (value: boolean, deviceId: string) => {
    // console.log('🚀 ~ handleOnSwitch ~ value:', value);
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

  // console.log('🚀 ~ deviceArray:', deviceArray);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Cập nhật dữ liệu mới
      const devices = getDevices(id);
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={{
        paddingHorizontal: wp(2),
        paddingBottom: hp(2),
      }}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //     colors={[theme.colors.primary]}
      //   />
      // }
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
            switch (device.type) {
              case DeviceType.ELECTRIC_METER:
                return (
                  <CardCustom
                    key={index}
                    deviceId={device.id}
                    title='Điện'
                    value={calculate(deviceArray)[0]}
                    unit='kWh'
                    icon='lightning-bolt-outline'
                  />
                );

              case DeviceType.WATER_METER:
                return (
                  <CardCustom
                    deviceId={device.id}
                    title='Nước'
                    value={calculate(deviceArray)[3]}
                    unit='m3'
                    icon='water-outline'
                  />
                );

              default:
                return <></>;
            }
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
            switch (device.type) {
              case DeviceType.LIGHT:
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
                    // setDeviceArray={setDeviceArray}
                  />
                );
              case DeviceType.FAN:
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
                    // setDeviceArray={setDeviceArray}
                  />
                );
              case DeviceType.AIR_CONDITIONER:
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
                    // setDeviceArray={setDeviceArray}
                  />
                );
              default:
                return <></>;
            }
          })}
        </View>
      </View>
    </ScrollView>
  );
};
