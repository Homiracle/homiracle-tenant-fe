import React, { useEffect } from 'react';
import { Text } from 'react-native-paper';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../Theme';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch, useAppSelector } from '../../Store/hook';
import {
  DeviceState,
  selectDeviceById,
  updateDevice,
} from '../../Store/reducers';
import { useSocket } from '../../Hooks';

export enum AirConditionerMode {
  COOL = 'Cool',
  HEAT = 'Heat',
  FAN = 'Fan',
  // DRY = 'Dry',
  // AUTO = 'Auto',
}

const MAX_TEMP = 30;
const MIN_TEMP = 16;

export const AirConditionerScreen = ({
  id,
  name,
  // value,
  navigation,
}: {
  id: string;
  name: string;
  value: { value: number; status: boolean; mode: AirConditionerMode };
  navigation: any;
}) => {
  const theme = useAppTheme();
  const airCon = useAppSelector(selectDeviceById(id)) as DeviceState;
  const { value } = airCon;
  const [currentValue, setCurrentValue] = React.useState(value.value);
  const [isOn, setIsOn] = React.useState(value.status);
  const [currentMode, setCurrentMode] = React.useState(value.mode);
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    fill: {
      color: isOn ? theme.colors.primary : theme.colors.backdrop,
      fontSize: 40,
      fontWeight: 'bold',
    },
    mode: {
      padding: wp(4),
      borderRadius: wp(2),
      alignItems: 'center',
    },
    textMode: {
      color: theme.colors.onPrimary,
    },
  });

  let fill = (currentValue / MAX_TEMP) * 100;

  const { socketInstance, message, isConnected } = useSocket();

  useEffect(() => {
    if (message) {
      // console.log('Message:', message);
      const { deviceId, value } = message as {
        deviceId: string;
        value: string;
      };
      if (deviceId === id) {
        setCurrentValue(JSON.parse(value).value);
        setIsOn(JSON.parse(value).status);
        setCurrentMode(JSON.parse(value).mode);
        dispatch(updateDevice({ id, value: JSON.parse(value), field: 'all' }));
      }
    }
  }, [message]);

  const onPressPlus = () => {
    if (!socketInstance || !isConnected) {
      console.log('Socket is not connected');
      return;
    }
    if (currentValue < MAX_TEMP) {
      setCurrentValue(currentValue + 1);
      dispatch(
        updateDevice({
          id,
          value: { value: currentValue + 1 },
          field: 'value',
        }),
      );
      socketInstance.emit('control', {
        deviceId: id,
        value: { ...value, value: currentValue + 1 },
      });
    }
  };

  const onPressMinus = () => {
    if (!isOn) return;
    
    if (!socketInstance || !isConnected) {
      console.log('Socket is not connected');
      return;
    }
    if (currentValue > MIN_TEMP) {
      setCurrentValue(currentValue - 1);
      dispatch(
        updateDevice({
          id,
          value: { value: currentValue - 1 },
          field: 'value',
        }),
      );
      socketInstance.emit('control', {
        deviceId: id,
        value: { ...value, value: currentValue - 1 },
      });
    }
  };

  const togglePower = () => {
    if (!socketInstance || !isConnected) {
      console.log('Socket is not connected');
      return;
    }
    setIsOn(!isOn);
    dispatch(
      updateDevice({
        id,
        value: { status: !isOn },
        field: 'status',
      }),
    );
    socketInstance.emit('control', {
      deviceId: id,
      value: { ...value, status: !isOn },
    });
  };

  const changeMode = (mode: AirConditionerMode) => {
    if (!socketInstance || !isConnected) {
      console.log('Socket is not connected');
      return;
    }
    setCurrentMode(mode);
    dispatch(
      updateDevice({
        id,
        value: { mode },
        field: 'mode',
      }),
    );
    socketInstance.emit('control', {
      deviceId: id,
      value: { ...value, mode: mode },
    });
  };

  const renderItem = ({ item: mode }: { item: AirConditionerMode }) => (
    <TouchableOpacity
      key={mode}
      style={[
        styles.mode,
        {
          backgroundColor:
            currentMode === mode && isOn
              ? theme.colors.primary
              : theme.colors.backdrop,
        },
      ]}
      onPress={() => {
        isOn && changeMode(mode);
      }}
    >
      <Icon
        name={
          mode === AirConditionerMode.COOL
            ? 'snowflake'
            : mode === AirConditionerMode.HEAT
              ? 'weather-sunny'
              : mode === AirConditionerMode.FAN
                ? 'fan'
                : 'tune-variant'
        }
        style={styles.textMode}
        size={40}
      />
      <Text
        variant='bodyLarge'
        style={[
          styles.textMode,
          {
            color:
              currentMode === mode && isOn
                ? theme.colors.onPrimary
                : theme.colors.onPrimary,
          },
        ]}
      >
        {mode}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: wp(20),
        }}
      >
        <TouchableOpacity
          onPress={onPressMinus}
          // activeOpacity={2}
          style={{ padding: 10 }} // Thêm padding để mở rộng vùng nhấn
        >
          <Icon
            name='minus'
            size={40}
            color={isOn ? theme.colors.primary : theme.colors.backdrop}
          />
        </TouchableOpacity>
        <AnimatedCircularProgress
          size={240}
          width={20}
          fill={fill}
          tintColor={isOn ? theme.colors.primary : theme.colors.backdrop}
          backgroundColor={theme.palettes.neutral[90]}
          rotation={0}
        >
          {fill => <Text style={styles.fill}>{currentValue + ' °C'}</Text>}
        </AnimatedCircularProgress>
        <TouchableOpacity
          onPress={() => {
            isOn && onPressPlus();
          }}
          // activeOpacity={2}
          style={{ padding: 10 }} // Thêm padding để mở rộng vùng nhấn
        >
          <Icon
            name='plus'
            size={40}
            color={isOn ? theme.colors.primary : theme.colors.backdrop}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(4),
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={togglePower}>
          <Icon
            name='power'
            size={40}
            color={isOn ? theme.colors.primary : theme.colors.backdrop}
          />
        </TouchableOpacity>
        <Text
          variant='bodyLarge'
          style={{
            color: isOn ? theme.colors.primary : theme.colors.backdrop,
            marginLeft: wp(4),
          }}
        >
          {isOn ? 'ON' : 'OFF'}
        </Text>
      </View>
      <FlatList
        data={Object.values(AirConditionerMode)}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: wp(4),
          marginTop: hp(4),
        }}
        ItemSeparatorComponent={() => <View style={{ width: wp(4) }} />}
      />
    </View>
  );
};
