import {
  useAcceptRoomMutation,
  useDenyRoomMutation,
  useGetDetailRoomQuery,
} from '../../Services/attendances';
import { AttendanceStatus } from '../../Constants/AttendanceStatus';
import { useAppTheme } from '../../Theme';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, DataTable, Surface, Text } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const RoomInfo = ({
  tabName,
  id,
  setIsOk,
  setIsAccept,
}: {
  tabName?: string;
  id: number;
  setIsOk: (isOk: boolean) => void;
  setIsAccept: (isAccept: boolean) => void;
}) => {
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    surface: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.onPrimary,
      marginHorizontal: wp(2),
      borderRadius: wp(2),
      width: wp(96),
      paddingHorizontal: wp(4),
      paddingTop: hp(1),
      paddingBottom: hp(2),
      marginBottom: tabName !== AttendanceStatus.INVITING ? hp(2) : 0,
    },
    deny: {
      borderColor: theme.colors.error,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: theme.colors.background,
      width: wp(30),
    },
    accept: {
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: theme.colors.background,
      width: wp(30),
    },
  });

  const [acceptRoom, { isSuccess, isLoading, error }] = useAcceptRoomMutation();

  const handleAcceptRoom = () => {
    acceptRoom(id);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setIsOk(true);
      console.log('Accept room successfully');
    }
  }, [isSuccess]);

  const [
    denyRoom,
    { isSuccess: denySuccess, isLoading: denyLoading, error: denyError },
  ] = useDenyRoomMutation();

  const handleDenyRoom = () => {
    setIsAccept(false);
    denyRoom(id);
  };

  useEffect(() => {
    if (denyError) {
      console.log(denyError);
    }
  }, [denyError]);

  useEffect(() => {
    if (denySuccess) {
      setIsOk(true);
      console.log('Deny room successfully');
    }
  }, [denySuccess]);

  const { data: DetailData } = useGetDetailRoomQuery(id);
  useEffect(() => {
    if (DetailData) {
      console.log(DetailData);
    }
  }, [DetailData]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Surface style={styles.surface}>
        <DataTable style={{ width: wp(96) }}>
          {/* Bên cho thuê */}
          <DataTable.Header>
            <DataTable.Title>
              <Text
                variant='bodyLarge'
                style={{ color: theme.colors.primary, fontWeight: 'bold' }}
              >
                Bên cho thuê
              </Text>
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Tên</DataTable.Cell>
            <DataTable.Cell numeric>
              {DetailData?.landlord.user_name}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Email</DataTable.Cell>
            <DataTable.Cell numeric>
              {DetailData?.landlord.email}
            </DataTable.Cell>
          </DataTable.Row>
          {/* Bên thuê */}
          <DataTable.Header>
            <DataTable.Title>
              <Text
                variant='bodyLarge'
                style={{ color: theme.colors.primary, fontWeight: 'bold' }}
              >
                Bên thuê
              </Text>
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Tên</DataTable.Cell>
            <DataTable.Cell numeric>
              {DetailData?.tenant.user_name}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Email</DataTable.Cell>
            <DataTable.Cell numeric>{DetailData?.tenant.email}</DataTable.Cell>
          </DataTable.Row>
          {/* Thông tin cho thuê */}
          <DataTable.Header style={{ borderColor: 'transparent' }}>
            <DataTable.Title>
              <Text
                variant='bodyLarge'
                style={{ color: theme.colors.primary, fontWeight: 'bold' }}
              >
                Thông tin chung
              </Text>
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row style={{ borderColor: 'transparent' }}>
            <DataTable.Cell>Phòng</DataTable.Cell>
            <DataTable.Cell numeric>{DetailData?.name}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Địa chỉ</DataTable.Cell>
            <DataTable.Cell numeric>
              <Text numberOfLines={88} style={{ textAlign: 'right' }}>
                {DetailData?.address}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Số lượng người ở tối đa</DataTable.Cell>
            <DataTable.Cell numeric>
              {DetailData?.maximum_number_of_peoples}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Ngày bắt đầu hợp đồng</DataTable.Cell>
            <DataTable.Cell numeric>{DetailData?.start_date}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Ngày kết thúc hợp đồng</DataTable.Cell>
            <DataTable.Cell numeric>{DetailData?.end_date}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Ngày bắt đầu tính tiền</DataTable.Cell>
            <DataTable.Cell numeric>
              {DetailData?.couting_fee_day}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Kì thanh toán tiền phòng</DataTable.Cell>
            <DataTable.Cell numeric>
              {DetailData?.paying_cost_cycle}
            </DataTable.Cell>
          </DataTable.Row>
          {/* Chi phí */}
          <DataTable.Header style={{ borderColor: 'transparent' }}>
            <DataTable.Title>
              <Text
                variant='bodyLarge'
                style={{ color: theme.colors.primary, fontWeight: 'bold' }}
              >
                Chi phí
              </Text>
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row style={{ borderColor: 'transparent' }}>
            <DataTable.Cell>Tiền phòng</DataTable.Cell>
            <DataTable.Cell numeric>
              {DetailData?.cost.room_cost}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Tiền đặt cọc</DataTable.Cell>
            <DataTable.Cell numeric>{DetailData?.cost.deposit}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Giá điện</DataTable.Cell>
            <DataTable.Cell numeric>
              {DetailData?.cost.power_cost}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Giá nước</DataTable.Cell>
            <DataTable.Cell numeric>
              {DetailData?.cost.water_cost}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Surface>
      {/* Button */}
      {tabName === AttendanceStatus.INVITING && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: wp(10),
            marginVertical: hp(2),
          }}
        >
          <Button
            mode='outlined'
            style={styles.deny}
            textColor={theme.colors.error}
            onPress={handleDenyRoom}
            loading={denyLoading}
          >
            Từ chối
          </Button>
          <Button
            mode='outlined'
            style={styles.accept}
            onPress={handleAcceptRoom}
            loading={isLoading}
          >
            Đồng ý
          </Button>
        </View>
      )}
    </ScrollView>
  );
};
