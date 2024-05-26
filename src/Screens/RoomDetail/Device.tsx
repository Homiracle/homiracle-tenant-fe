import { DeviceType } from '../../Constants/DeviceType';
import { CardCustom, CardCustomForControlledDevice } from '../../Components';
import { useAppTheme } from '../../Theme';
import React, { useEffect, useState } from 'react';
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

interface DeviceExt extends Device {
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
  useEffect(() => {
    if (deviceSuccess && deviceData) {
      console.log('🚀 ~ useEffect ~ deviceData:', deviceData);
      const devices = deviceData as DeviceExt[];
      setDeviceArray(devices);

      const promises = devices.map(device => {
        return getDataIotDevices(device.device_id).then(res => {
          let value = res.data?.value;
          switch (device.type) {
            case DeviceType.LIGHT:
              value = value || { status: false };
              break;
            case DeviceType.FAN:
              value = value || { status: false };
              break;
            case DeviceType.AIR_CONDITIONER:
              value = value || {
                status: true,
                value: 25,
                mode: AirConditionerMode.COOL,
              };
              break;
            default:
              break;
          }
          setDeviceArray(prev => {
            return prev.map(d => {
              if (d.device_id === device.device_id) {
                return {
                  ...d,
                  value: res.data?.value || value,
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
        });
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
  const { socketInstance, message, isConnected } = useSocket();
  useEffect(() => {
    if (message && dataLoaded) {
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
      dispatch(updateDevice({ id: deviceId, value: JSON.parse(value), field: 'value' }));
    }
  }, [message]);

  /**
   * handle on switch
   */
  const handleOnSwitch = (value: boolean, deviceId: string) => {
    console.log("🚀 ~ handleOnSwitch ~ value:", value)
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

    dispatch(updateDevice({ id: deviceId, value: { status: value }, field: 'status' }));

    socketInstance.emit('control', {
      deviceId: deviceId,
      value: { status: value },
    });
  };

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
