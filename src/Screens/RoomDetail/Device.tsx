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
} from '../../Services';
import type { Device } from '../../Services/devices/type';
import { useSocket } from '../../Hooks';
import { useAppDispatch } from '../../Store/hook';
import { setDevice, updateDevice } from '../../Store/reducers';
import { AirConditionerMode } from '../DeviceDetail/AirConditionerScreen';
import { useFocusEffect } from '@react-navigation/native';

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
  const time = 10;

  // hooks
  const theme = useAppTheme();
  const [deviceArray, setDeviceArray] = useState<DeviceExt[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useAppDispatch();

  /**
   * Fetch device data
   */
  const {
    data: deviceData,
    isSuccess: deviceSuccess,
    isLoading: deviceLoading,
    error: deviceError,
  } = useGetDevicesQuery(id);

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

  const calculate = (deviceList: DeviceExt[]) => {
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

  const handleSetValue = (device: DeviceExt, value: any) => {
    setDeviceArray(prev => {
      return prev.map(d => {
        if (d.device_id === device.device_id) {
          return {
            ...d,
            value: value,
          };
        }
        return d;
      });
    });
    dispatch(
      setDevice({
        id: device.device_id,
        name: device.name,
        type: device.type,
        value: value,
      }),
    );
  };

  useEffect(() => {
    if (deviceSuccess && deviceData) {
      // console.log('🚀 ~ useEffect ~ deviceData:', deviceData);
      const devices = deviceData as DeviceExt[];
      setDeviceArray(devices);

      const promises = devices.map(device => {
        switch (device.type) {
          case DeviceType.LIGHT:
            let valueLight = { status: false };
            handleSetValue(device, valueLight);
            break;
          case DeviceType.FAN:
            let valueFan = { status: false };
            handleSetValue(device, valueFan);
            break;
          case DeviceType.AIR_CONDITIONER:
            let valueAir = {
              status: true,
              value: 25,
              mode: AirConditionerMode.COOL,
            };
            handleSetValue(device, valueAir);
            break;
          case DeviceType.ELECTRIC_METER:
          case DeviceType.WATER_METER:
            getDataIotDevices(device.device_id).then(res => {
              let value = res.data?.value;
              handleSetValue(device, value);
            });
            break;
          default:
            break;
        }
      });

      // Đợi tất cả các promise hoàn thành
      Promise.all(promises).then(() => {
        console.log('All promises are resolved');
        setDataLoaded(true);
      });
    }
  }, [deviceSuccess]);

  /**
   * listen to iot data change
   */

  const handleUpdateValue = (device: DeviceExt, value: any) => {
    switch (device.type) {
      case DeviceType.ELECTRIC_METER:
      case DeviceType.WATER_METER:
        dispatch(
          updateDevice({
            id: device.device_id,
            value: JSON.parse(value),
            field: 'value',
          }),
        );
        break;
      case DeviceType.LIGHT:
      case DeviceType.FAN:
        dispatch(
          updateDevice({
            id: device.device_id,
            value: JSON.parse(value),
            field: 'status',
          }),
        );
        break;
      case DeviceType.AIR_CONDITIONER:
        dispatch(
          updateDevice({
            id: device.device_id,
            value: JSON.parse(value),
            field: 'all',
          }),
        );
        break;
      default:
        break;
    }
  };
  const { socketInstance, message, isConnected, connectSocket, disconnectSocket } = useSocket();

  // Handle socket reconnection using useFocusEffect
  useFocusEffect(
    useCallback(() => {
      console.log('Connecting to socket');
      connectSocket();

      return () => {
        console.log('Disconnecting from socket');
        disconnectSocket();
      };
    }, [connectSocket, disconnectSocket])
  );

  useEffect(() => {
    if (message && dataLoaded) {
      // console.log("🚀 ~ useEffect ~ message:", message)
      const { deviceId, value } = message;
      setDeviceArray(prev => {
        return prev.map(d => {
          if (d.device_id === deviceId) {
            return {
              ...d,
              value: JSON.parse(value),
            };
          }
          return d;
        });
      });
      const device = deviceArray.find(d => d.device_id === deviceId) as DeviceExt;
      handleUpdateValue(device, value);
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
    setDeviceArray(prev => {
      return prev.map(d => {
        if (d.device_id === deviceId) {
          return {
            ...d,
            value: { ...d.value, status: value },
          };
        }
        return d;
      });
    });

    dispatch(
      updateDevice({ id: deviceId, value: { status: value }, field: 'status' }),
    );

    const device = deviceArray.find(d => d.device_id === deviceId) as DeviceExt;

    socketInstance.emit('control', {
      deviceId: deviceId,
      value: { ...device.value, status: value },
    });
  };

  // console.log('🚀 ~ deviceArray:', deviceArray);

  return (
    <ScrollView
      style={{
        paddingHorizontal: wp(2),
        paddingBottom: hp(2),
      }}
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
                    deviceId={device.device_id}
                    title='Điện'
                    value={calculate(deviceArray)[0]}
                    unit='kWh'
                    icon='lightning-bolt-outline'
                  />
                );

              case DeviceType.WATER_METER:
                return (
                  <CardCustom
                    deviceId={device.device_id}
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
                    deviceId={device.device_id}
                    deviceType={device.type}
                    title={device.name}
                    value={device.value?.status || false}
                    onValueChange={(value: boolean) =>
                      handleOnSwitch(value, device.device_id)
                    }
                    navigation={navigation}
                    setDeviceArray={setDeviceArray}
                  />
                );
              case DeviceType.FAN:
                return (
                  <CardCustomForControlledDevice
                    key={index}
                    deviceId={device.device_id}
                    deviceType={device.type}
                    title={device.name}
                    value={device.value?.status || false}
                    onValueChange={(value: boolean) =>
                      handleOnSwitch(value, device.device_id)
                    }
                    navigation={navigation}
                    setDeviceArray={setDeviceArray}
                  />
                );
              case DeviceType.AIR_CONDITIONER:
                return (
                  <CardCustomForControlledDevice
                    key={index}
                    deviceId={device.device_id}
                    deviceType={device.type}
                    title={device.name}
                    value={device.value?.status || false}
                    onValueChange={(value: boolean) =>
                      handleOnSwitch(value, device.device_id)
                    }
                    navigation={navigation}
                    setDeviceArray={setDeviceArray}
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
