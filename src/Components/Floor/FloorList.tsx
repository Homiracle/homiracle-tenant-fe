import { FlatList } from 'native-base';
import React from 'react';
import { NativeScrollEvent, View } from 'react-native';
import { FloorItem } from './FloorItem';
import { FlatListProps } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export interface FloorListProps {
  data: any;
  onScroll?: ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => void;
}

export const FloorList = ({ data, onScroll }: FloorListProps) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
          alignSelf: 'center',
          paddingBottom: hp(10)
        }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={data}
        renderItem={({ item }: { item: any }) => (
          <FloorItem
            floor_id={item.floor_id}
            floor_name={item.floor_name}
            num_of_room={item.number_of_rooms}
          />
        )}
        onScroll={onScroll}
      />
    </View>
  );
};
