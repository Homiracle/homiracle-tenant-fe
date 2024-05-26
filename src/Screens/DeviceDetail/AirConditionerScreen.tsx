import React from 'react';
import { Text } from 'react-native-paper';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../Theme';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Header } from '../../Components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch, useAppSelector } from '../../Store/hook';
import { updateDevice } from '../../Store/reducers';

export enum AirConditionerMode {
  COOL = 'Cool',
  HEAT = 'Heat',
  FAN = 'Fan',
  DRY = 'Dry',
  AUTO = 'Auto',
}

const MAX_TEMP = 30;
const MIN_TEMP = 16;

export const AirConditionerScreen = ({
  id,
  name,
  value,
  navigation,
}: {
  id: string;
  name: string;
  value: { value: number; status: boolean; mode: AirConditionerMode };
  navigation: any;
}) => {
  const theme = useAppTheme();

  const styles = StyleSheet.create({
    fill: {
      color: theme.colors.primary,
      fontSize: 40,
      fontWeight: 'bold',
    },
    mode: {
      padding: wp(4),
      backgroundColor: theme.colors.primary,
      borderRadius: wp(2),
      alignItems: 'center',
    },
    textMode: {
      color: theme.colors.onPrimary,
    },
  });

  const [currentValue, setCurrentValue] = React.useState(value.value);
  const dispatch = useAppDispatch();

  let fill = (currentValue / MAX_TEMP) * 100;

  const onPressPlus = () => {
    if (currentValue < MAX_TEMP) {
      setCurrentValue(currentValue + 1);
      dispatch(
        updateDevice({
          id,
          value: { value: currentValue + 1 },
          field: 'value',
        }),
      );
    }
  };

  const onPressMinus = () => {
    if (currentValue > MIN_TEMP) {
      setCurrentValue(currentValue - 1);
      dispatch(
        updateDevice({
          id,
          value: { value: currentValue - 1 },
          field: 'value',
        }),
      );
    }
  };

  // useAppSelector(state =>
  //   console.log(state.device.find(device => device.id === id)),
  // );

  return (
    <View>
      {/* <Text>AirConditionerScreen</Text> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: wp(20),
        }}
      >
        <TouchableOpacity onPress={onPressMinus}>
          <Icon name='minus' size={40} color={theme.colors.primary} />
        </TouchableOpacity>
        <AnimatedCircularProgress
          size={240}
          width={20}
          fill={fill}
          tintColor={theme.colors.primary}
          // onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor={theme.palettes.neutral[90]}
          rotation={0}
        >
          {fill => <Text style={styles.fill}>{currentValue + ' °C'}</Text>}
        </AnimatedCircularProgress>
        <Icon
          name='plus'
          size={40}
          color={theme.colors.primary}
          onPress={onPressPlus}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(4),
          alignItems: 'center',
        }}
      >
        <Icon
          name='power'
          size={40}
          color={value.status ? theme.colors.primary : theme.colors.backdrop}
        />
        <Text
          variant='bodyLarge'
          style={{
            color: value.status ? theme.colors.primary : theme.colors.backdrop,
            marginLeft: wp(4),
          }}
        >
          {value.status ? 'ON' : 'OFF'}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: wp(6),
          justifyContent: 'center',
          marginTop: hp(4),
        }}
      >
        <View style={styles.mode}>
          <Icon name='snowflake' style={styles.textMode} size={40} />
          <Text variant='bodyLarge' style={styles.textMode}>
            Cool
          </Text>
        </View>
        <View style={styles.mode}>
          <Icon name='weather-sunny' style={styles.textMode} size={40} />
          <Text variant='bodyLarge' style={styles.textMode}>
            Heat
          </Text>
        </View>
        <View style={styles.mode}>
          <Icon name='fan' style={styles.textMode} size={40} />
          <Text variant='bodyLarge' style={styles.textMode}>
            Fan
          </Text>
        </View>
      </View>
    </View>
  );
};
