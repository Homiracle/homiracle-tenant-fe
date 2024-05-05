import { RootScreens } from '../../Constants/RootScreen';
import { AttendanceStatus } from '../../Constants/AttendanceStatus';
import { useGetAcceptedRoomsQuery } from '../../Services/attendances';
import { useAppTheme } from '../../Theme';
import React, { useEffect } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const RoomList = ({
  status,
  navigation,
  tabName,
}: {
  status: AttendanceStatus;
  navigation: any;
  tabName?: string;
}) => {
  const theme = useAppTheme();

  const { data, isSuccess, isLoading } = useGetAcceptedRoomsQuery(status);

  useEffect(() => {
    if (isSuccess) {
      console.log(JSON.stringify(data));
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading && (
        <ActivityIndicator size='small' color={theme.colors.primary} />
      )}
      {isSuccess && data.length === 0 && (
        <Text style={{ textAlign: 'center' }}>Không có phòng nào</Text>
      )}
      {isSuccess && data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.onPrimary,
                  borderRadius: 10,
                  padding: 10,
                }}
                onPress={() =>
                  navigation.navigate(RootScreens.ROOM_DETAIL, {
                    attendance_id: item.id,
                    room_id: item.room_id,
                    name: item.name,
                    screenName: tabName,
                  })
                }
              >
                <View style={{ flexDirection: 'row', gap: wp(4) }}>
                  <Image
                    source={{
                      uri: 'https://file4.batdongsan.com.vn/resize/1275x717/2024/03/07/20240307114527-38f0_wm.jpg',
                    }}
                    style={{
                      width: wp(36),
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
                    <Text
                      variant='bodyLarge'
                      ellipsizeMode='tail'
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Text
                      variant='bodySmall'
                      ellipsizeMode='tail'
                      numberOfLines={2}
                      style={{ flexGrow: 1, width: wp(50) }}
                    >
                      {item.address}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: wp(5),
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 2,
                          flexGrow: 1,
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
                          variant='bodyMedium'
                          style={{ color: theme.colors.primary }}
                          ellipsizeMode='middle'
                          numberOfLines={0}
                        >
                          {item.number_of_devices + ' thiết bị'}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 2,
                          flexGrow: 1,
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
                          variant='bodyMedium'
                          style={{ color: theme.colors.primary }}
                          ellipsizeMode='tail'
                          numberOfLines={1}
                        >
                          {item.number_of_tenants + ' người'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )}
          keyExtractor={item => item.id?.toString()}
          contentContainerStyle={{
            paddingBottom: wp(2),
            paddingHorizontal: wp(2),
            gap: wp(3),
          }}
        ></FlatList>
      )}
    </>
  );
};
