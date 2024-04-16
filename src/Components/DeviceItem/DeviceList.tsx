import { FlatList } from 'native-base';
import React, { useEffect } from 'react';
import { DeviceItem } from './DeviceItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { NativeScrollEvent, View } from 'react-native';
import { useGetDevicesQuery } from '../../Services';

export interface DeviceListProps {
  scope: string;
  scope_id: string;
  onScroll?: ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => void;
}

export const DeviceList = ({ scope, scope_id, onScroll }: DeviceListProps) => {
  const devicedata = [
    {
      device_id: '1',
      device_name: 'cam bien abc',
      type: 'cam bien',
      status: 'connected',
    },
    {
      device_id: '1',
      device_name: 'cam bien abc',
      type: 'cam bien',
      status: 'connected',
    },
    {
      device_id: '1',
      device_name: 'cam bien abcxyaysyas',
      type: 'cam bien',
      status: 'connected',
    },
  ];

  const { data, isSuccess, error } = useGetDevicesQuery({
    accessable_scope: scope,
    accessable_scope_id: scope_id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log('data', data);
    } else if (error) {
      console.log('error', error);
    }
  }, [isSuccess, error]);

  return (
    <FlatList
      contentContainerStyle={{
        justifyContent: 'center',
        alignSelf: 'center',
        gap: 10,
        paddingBottom: hp(10),
      }}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => (
        <DeviceItem
          device_id={item?.device_id || ''}
          device_name={item?.name || ''}
          type={item?.type || ''}
          status={item?.status || ''}
        />
      )}
      onScroll={onScroll}
    />
  );
};
