import { useAppTheme } from '../../Theme';
import { Header } from '../../Components';
import React from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Room = () => {
  const theme = useAppTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  const RoomData = [
    {
      room_id: '1',
      name: 'Phòng trọ 1',
      city: 'Hà Nội',
      district: 'Ba Đình',
      commune: 'Ngọc Hà',
      street: '123 Đường ABC',
      number_of_devices: 2,
      number_of_tenants: 2,
    },
    {
      room_id: '2',
      name: 'Phòng trọ 2',
      city: 'Hà Nội',
      district: 'Ba Đình',
      commune: 'Ngọc Hà',
      street: '123 Đường ABC',
      number_of_devices: 2,
      number_of_tenants: 2,
    },
  ];

  return (
    <View>
      <Header title='Phòng trọ của tôi' height={hp(2)} mode='center-aligned'>
        {/* <Searchbar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Tìm phòng trọ'
          placeholderTextColor={theme.palettes.neutral['60']}
          style={{ width: wp(90), left: wp(5) }}
        /> */}
      </Header>
      <FlatList
        data={RoomData}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.onPrimary,
                borderRadius: 10,
                padding: 10,
              }}
            >
              <View style={{ flexDirection: 'row', gap: wp(4) }}>
                <Image
                  source={{
                    uri: 'https://file4.batdongsan.com.vn/resize/1275x717/2024/03/07/20240307114527-38f0_wm.jpg',
                  }}
                  style={{
                    width: wp(40),
                    height: hp(12),
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                  }}
                >
                  <Text variant='bodyLarge'>{item.name}</Text>
                  <Text
                    variant='bodySmall'
                    ellipsizeMode='tail'
                    numberOfLines={2}
                    style={{ flexGrow: 1, width: wp(50) }}
                  >
                    {item.street}, {item.commune}, {item.district}, {item.city}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: wp(16),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 2
                      }}
                    >
                      <Icon
                        name='lightbulb-outline'
                        size={18}
                        style={{
                          alignSelf: 'center',
                          color: theme.colors.primary,
                        }}
                      />
                      <Text
                        variant='bodyLarge'
                        style={{ color: theme.colors.primary }}
                      >
                        {item.number_of_devices}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 2
                      }}
                    >
                      <Icon
                        name='account-multiple-outline'
                        size={18}
                        style={{
                          alignSelf: 'center',
                          color: theme.colors.primary,
                        }}
                      />
                      <Text
                        variant='bodyLarge'
                        style={{ color: theme.colors.primary }}
                      >
                        {item.number_of_tenants}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}
        keyExtractor={item => item.room_id}
        contentContainerStyle={{ padding: wp(2), gap: wp(3) }}
      ></FlatList>
    </View>
  );
};
