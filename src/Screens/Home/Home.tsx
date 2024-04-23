import { Header, CustomStatusBar } from '../../Components';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Switch, Text } from 'react-native-paper';
import { RootScreens } from '../../Constants/RootScreen';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { HomeScreenNavigatorProps } from './HomeContainer';
import { useAppTheme } from '../../Theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CardCustom } from '../../Components';
import { useSocket } from '../../Hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DeviceType } from '../../Constants/DeviceType';

export const Home = ({ route, navigation }: HomeScreenNavigatorProps) => {
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    whiteText: {
      color: theme.colors.onPrimary,
    },
  });

  const deviceArray = [
    {
      device_id: 1,
      name: 'Đèn 1',
      type: DeviceType.LIGHT,
    },
    {
      device_id: 2,
      name: 'Quạt 1',
      type: DeviceType.FAN,
    },
    {
      device_id: 3,
      name: 'Quạt 2',
      type: DeviceType.FAN,
    },
    {
      device_id: 4,
      name: 'Đèn 2',
      type: DeviceType.FAN,
    },
  ];

  const { socketInstance, message, connectionError } = useSocket();

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <View style={{ flex: 1 }}>
      <Header title='Trang chủ' height={0} mode='center-aligned' />
      <ScrollView
        style={{
          paddingHorizontal: wp(2),
          paddingVertical: hp(2),
        }}
      >
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: 'bold',
            marginBottom: 12,
          }}
          variant='titleMedium'
        >
          Chung
        </Text>
        <View style={{ flexDirection: 'column', gap: hp(1) }}>
          <View style={{ flexDirection: 'row', gap: wp(2) }}>
            <CardCustom
              title='Điện'
              value={325}
              unit='kWh'
              icon='lightning-bolt-outline'
            />
            <CardCustom
              title='Nước'
              value={20}
              unit='m3'
              icon='water-outline'
            />
          </View>
          <View style={{ flexDirection: 'row', gap: wp(2) }}>
            <CardCustom
              title='Nhiệt độ'
              value={30}
              unit='°C'
              icon='thermometer'
            />
            <CardCustom
              title='Độ ẩm'
              value={60}
              unit='%'
              icon='water-percent'
            />
          </View>
        </View>
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: 'bold',
            marginVertical: 12,
          }}
          variant='titleMedium'
        >
          Thiết bị
        </Text>
        <View
          style={{
            paddingBottom: 20,
            paddingHorizontal: 2,
            gap: wp(2),
            marginBottom: hp(2),
          }}
        >
          {deviceArray.map((device) => {
            return (
              <Card
                key={device.device_id}
                style={{
                  backgroundColor: theme.colors.onPrimary,
                  borderWidth: 1,
                  borderColor: theme.colors.primary,
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
                  <Switch value={true} />
                </Card.Content>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
