import { DeviceType } from '../../Constants/DeviceType';
import { CardCustom } from '../../Components';
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

interface DeviceExt extends Device {
  value?: any;
}

export const DeviceComponent = ({ id }: { id: number }) => {
  // constants
  const time = 10;

  // hooks
  const theme = useAppTheme();
  const [deviceArray, setDeviceArray] = useState<DeviceExt[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

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

          case DeviceType.HUMIDTY_SENSOR:
            device.value && (sumH += device.value.value);
            break;

          case DeviceType.TEMPERATURE_SENSOR:
            device.value && (sumT += device.value.value);
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

  // const classifyDevices = (deviceList: DeviceExt[]) => {
  //   for (const device of deviceList) {
  //     switch (device.type) {
  //       case DeviceType.ELECTRIC_METER:
  //         setElectricDevices(prev => [...prev, device]);
  //         break;

  //       case DeviceType.HUMIDTY_SENSOR:
  //         setHumidityDevices(prev => [...prev, device]);
  //         break;

  //       case DeviceType.TEMPERATURE_SENSOR:
  //         setTemperatureDevices(prev => [...prev, device]);
  //         break;

  //       case DeviceType.WATER_METER:
  //         setWaterDevices(prev => [...prev, device]);
  //         break;

  //       case DeviceType.LIGHT:
  //         setLightDevices(prev => [...prev, device]);
  //         break;

  //       case DeviceType.FAN:
  //         setFanDevices(prev => [...prev, device]);
  //         break;

  //       case DeviceType.CAMERA:
  //         setCameraDevices(prev => [...prev, device]);
  //         break;

  //       default:
  //         console.log('Hê hê hê sai loại cmnr :))');
  //         break;
  //     }
  //   }
  // };

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
          setDeviceArray(prev => {
            return prev.map(d => {
              if (d.device_id === device.device_id) {
                return {
                  ...d,
                  value: res.data?.value,
                };
              }
              return d;
            });
          });
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
    }
  }, [message]);

  /**
   * handle on switch
   */
  const handleOnSwitch = (value: boolean, deviceId: string) => {
    if (!socketInstance || !isConnected) {
      console.log('Socket is not connected');
      return;
    }
    console.log('🚀 ~ handleOnSwitch ~ value:', value);
    setDeviceArray(prev => {
      return prev.map(d => {
        if (d.device_id === deviceId) {
          return {
            ...d,
            value: { value: value },
          };
        }
        return d;
      });
    });
    socketInstance.emit('control', {
      deviceId: deviceId,
      value: { value: value },
    });
  };

  return (
    <ScrollView
      style={{
        paddingHorizontal: wp(2),
        paddingBottom: hp(2),
      }}
    >
      {/* <Text
        style={{
          color: theme.colors.primary,
          fontWeight: 'bold',
          marginBottom: 12,
        }}
        variant='titleMedium'
      >
        Chung
      </Text> */}
      <View
        style={{
          flexDirection: 'column',
          gap: hp(1),
          paddingBottom: 2,
          paddingHorizontal: 2,
        }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: wp(2) }}>
          {deviceArray.map(device => {
            switch (device.type) {
              case DeviceType.ELECTRIC_METER:
                return (
                  <CardCustom
                    title='Điện'
                    value={calculate(deviceArray)[0]}
                    unit='kWh'
                    icon='lightning-bolt-outline'
                  />
                );

              case DeviceType.WATER_METER:
                return (
                  <CardCustom
                    title='Nước'
                    value={calculate(deviceArray)[3]}
                    unit='m3'
                    icon='water-outline'
                  />
                );

              case DeviceType.TEMPERATURE_SENSOR:
                return (
                  <CardCustom
                    title='Nhiệt độ'
                    value={calculate(deviceArray)[2]}
                    unit='°C'
                    icon='thermometer'
                  />
                );

              case DeviceType.HUMIDTY_SENSOR:
                return (
                  <CardCustom
                    title='Độ ẩm'
                    value={calculate(deviceArray)[1]}
                    unit='%'
                    icon='water-percent'
                  />
                );

              default:
                return <></>;
            }
          })}
        </View>
      </View>
      {/* <Text
        style={{
          color: theme.colors.primary,
          fontWeight: 'bold',
          marginVertical: 12,
        }}
        variant='titleMedium'
      >
        Thiết bị
      </Text> */}
      <View
        style={{
          paddingBottom: 20,
          paddingHorizontal: 2,
          gap: wp(2),
          marginVertical: wp(2),
        }}
      >
        {deviceArray.map(device => {
          switch (device.type) {
            case DeviceType.LIGHT:
              return (
                <Card
                  key={device.device_id}
                  style={{
                    backgroundColor: theme.colors.onPrimary,
                  }}
                >
                  <Card.Content
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Icon
                        name='lightbulb-outline'
                        size={40}
                        color={theme.colors.primary}
                      ></Icon>
                      <Text>{device.name}</Text>
                    </View>
                    <Switch
                      value={device.value?.value}
                      // onChange={() => handleOnSwitch(device.device_id)}
                      onValueChange={value =>
                        handleOnSwitch(value, device.device_id)
                      }
                    />
                  </Card.Content>
                </Card>
              );

            default:
              return <></>;
          }
        })}
      </View>
    </ScrollView>
  );
};
