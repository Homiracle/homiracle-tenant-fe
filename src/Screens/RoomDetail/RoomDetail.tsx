import React, { useEffect } from 'react';
import { RoomDetailScreenNavigatorProps } from './RoomDetailContainer';
import { useAppTheme } from '../../Theme';
import { StyleSheet, View } from 'react-native';
import { CustomDialog, Header } from '../../Components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Button, DataTable, Portal, Surface, Text } from 'react-native-paper';
import { AttendanceStatus } from '../../Constants/AttendanceStatus';
import {
  useAcceptRoomMutation,
  useDenyRoomMutation,
} from '../../Services/attendances';

export const RoomDetail = ({
  route,
  navigation,
}: RoomDetailScreenNavigatorProps) => {
  const theme = useAppTheme();
  const tabName = route.params.screenName;
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

  const name = route.params.name;
  const id = route.params.id;

  const [acceptRoom, { isSuccess, isLoading, error }] = useAcceptRoomMutation();

  const handleAcceptRoom = () => {
    acceptRoom(id);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const [isOk, setIsOk] = React.useState(false);
  const [isAccept, setIsAccept] = React.useState(true);
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

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={name}
        height={hp(6)}
        mode='center-aligned'
        scroll='vertical'
        onBack={() => navigation.goBack()}
      >
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
              <DataTable.Cell numeric>20 m2</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Email</DataTable.Cell>
              <DataTable.Cell numeric>20 m2</DataTable.Cell>
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
              <DataTable.Cell numeric>20 m2</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Email</DataTable.Cell>
              <DataTable.Cell numeric>20 m2</DataTable.Cell>
            </DataTable.Row>
            {/* Thông tin cho thuê */}
            <DataTable.Header style={{ borderColor: 'transparent' }}>
              <DataTable.Title>
                <Text
                  variant='bodyLarge'
                  style={{ color: theme.colors.primary, fontWeight: 'bold' }}
                >
                  Thông tin cho thuê
                </Text>
              </DataTable.Title>
            </DataTable.Header>
            <DataTable.Row style={{ borderColor: 'transparent' }}>
              <DataTable.Cell>Phòng</DataTable.Cell>
              <DataTable.Cell numeric>{name}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Số lượng người ở tối đa</DataTable.Cell>
              <DataTable.Cell numeric>20</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Số lượng người ở tối đa</DataTable.Cell>
              <DataTable.Cell numeric>20</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Số lượng người ở tối đa</DataTable.Cell>
              <DataTable.Cell numeric>20</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Số lượng người ở tối đa</DataTable.Cell>
              <DataTable.Cell numeric>20</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Số lượng người ở tối đa</DataTable.Cell>
              <DataTable.Cell numeric>20</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Số lượng người ở tối đa</DataTable.Cell>
              <DataTable.Cell numeric>20</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Số lượng người ở tối đa</DataTable.Cell>
              <DataTable.Cell numeric>20</DataTable.Cell>
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
      </Header>
      <Portal>
        <CustomDialog
          visible={isOk}
          content={
            isAccept
              ? 'Bạn đã được thêm vào phòng ở này'
              : 'Bạn đã từ chối phòng ở này'
          }
          confirmContent='OK'
          onConfirm={() => {
            setIsOk(false);
            navigation.goBack();
          }}
        />
      </Portal>
    </View>
  );
};
