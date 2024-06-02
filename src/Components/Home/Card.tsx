import { useAppTheme } from '../../Theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Switch, Text } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AirConIcon from '../../static/icon/AirConIcon';
import LedIcon from '../../static/icon/LedIcon';
import { DeviceType } from '../../Constants/DeviceType';
import { RootScreens } from '../../Constants/RootScreen';
import { DeviceExt } from '../../Screens/RoomDetail/Device';

export type CardCustomProps = {
  deviceId: string;
  title: string;
  value: number;
  unit: string;
  icon: string;
};

export const CardCustom = ({
  deviceId,
  title,
  value,
  unit,
  icon,
}: CardCustomProps) => {
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    whiteText: {
      color: theme.colors.primary,
    },
  });

  return (
    <Card
      style={{
        width: widthPercentageToDP(46),
        backgroundColor: 'white',
      }}
      key={deviceId}
    >
      <Card.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={styles.whiteText}>{title}</Text>
          <Text style={{ marginTop: 12 }}>
            <Text style={[styles.whiteText]} variant='displaySmall'>
              {value}
            </Text>
            <Text style={[styles.whiteText]}>{unit}</Text>
          </Text>
        </View>
        <Icon
          name={icon}
          size={40}
          style={{
            backgroundColor: 'rgba(220, 220, 220, 0.3)',
            borderRadius: 50,
            height: 50,
            width: 50,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: theme.colors.primary,
          }}
        />
      </Card.Content>
    </Card>
  );
};

export const CardCustomForControlledDevice = ({
  deviceId,
  deviceType,
  title,
  value,
  onValueChange,
  navigation,
}: {
  deviceId: string;
  deviceType: DeviceType;
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  navigation?: any;
}) => {
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    title: {
      fontWeight: 'bold',
      color: theme.colors.primary,
      fontSize: 16,
      marginTop: 12,
    },
    subTitle: {
      color: theme.colors.primary,
    },
  });

  return (
    <Card
      style={{
        width: widthPercentageToDP(46),
        backgroundColor: 'white',
      }}
      key={deviceId}
      onPress={() => {
        if (navigation && deviceType === DeviceType.AIR_CONDITIONER)
          navigation.navigate(RootScreens.DEVICE_DETAIL, {
            device_id: deviceId,
            device_type: deviceType,
            device_name: title,
          });
      }}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {deviceType === DeviceType.AIR_CONDITIONER && <AirConIcon />}
          {deviceType === DeviceType.LIGHT && <LedIcon />}
          {deviceType === DeviceType.FAN && (
            <Icon
              name='fan'
              size={40}
              style={{
                backgroundColor: 'rgba(220, 220, 220, 0.3)',
                borderRadius: 50,
                height: 50,
                width: 50,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: theme.colors.primary,
              }}
            />
          )}
          <Switch value={value} onValueChange={onValueChange} />
        </View>
        <Text style={styles.title}>{title}</Text>
        {/* <Text style={styles.subTitle}>Bật lúc 6:30</Text>  */}
      </Card.Content>
    </Card>
  );
};
