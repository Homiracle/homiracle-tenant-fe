import React from 'react';
import { Header } from '../../Components';
import { useAppTheme } from '../../Theme';
import { useAppSelector } from '../../Store/hook';
import { RootScreens } from '../../Constants/RootScreen';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Text, Avatar, Surface, DataTable, Button } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Profile = () => {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    content: {
      flex: 1,
      flexDirection: 'column',
      gap: hp(2),
    },
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
    },
    avatar: {
      marginVertical: hp(2),
      width: hp(20),
      height: hp(20),
      borderRadius: hp(100),
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileRow: {
      borderColor: 'transparent',
    },
    buttonView: {
      paddingHorizontal: wp(2),
      paddingVertical: hp(2),
      gap: hp(2),
    },
    buttonContent: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      paddingVertical: hp(1),
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: hp(1),
      width: '100%',
    },
  });

  const { user } = useAppSelector(rootState => rootState.user);

  const profile = {
    user_name: user.user_name || 'Sample',
    email: user.email || 'sample@mail.com',
    cid: user.CID || 'xxxxxxxx',
    avatarUrl: 'any',
    phone: user.phone || '09xxxxxxx',
    date_of_birth: user.date_of_birth ? user.date_of_birth : new Date(),
    isMale: Boolean(user.isMale) ? 'Nam' : 'Nữ',
    role: user.role,
    isVerified: false,
  };

  return (
    <View style={styles.content}>
      <Header
        title='Thông tin cá nhân'
        height={20}
        mode='center-aligned'
        onBack={() => navigation.navigate(RootScreens.HOME as never)}
        // onNotification={() => {}}
        scroll='vertical'
      >
        <Surface style={styles.surface}>
          {
            /* Avatar.Icon will be displayed as default if user doesn't have their own avatar */
            profile.avatarUrl ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://i.etsystatic.com/32954091/r/il/86ca0d/3742591777/il_570xN.3742591777_d6zp.jpg',
                }}
              />
            ) : (
              <Avatar.Icon
                size={hp(20)}
                icon='account-circle'
                style={styles.avatar}
              />
            )
          }
          <Text variant='displaySmall' style={{ fontWeight: 'bold' }}>
            {profile.user_name}
          </Text>
          <DataTable style={{ width: wp(100) }}>
            {/* Phone number */}
            <DataTable.Row style={styles.profileRow}>
              <DataTable.Cell>Số điện thoại</DataTable.Cell>
              <DataTable.Cell numeric>{profile.phone}</DataTable.Cell>
            </DataTable.Row>

            {/* Email */}
            <DataTable.Row style={styles.profileRow}>
              <DataTable.Cell>Email</DataTable.Cell>
              <DataTable.Cell numeric>{profile.email}</DataTable.Cell>
            </DataTable.Row>

            {/* Day of birth */}
            <DataTable.Row style={styles.profileRow}>
              <DataTable.Cell>Ngày sinh</DataTable.Cell>
              <DataTable.Cell numeric>
                {profile.date_of_birth.toLocaleDateString('en-GB')}
              </DataTable.Cell>
            </DataTable.Row>

            {/* Gender */}
            <DataTable.Row style={styles.profileRow}>
              <DataTable.Cell>Giới tính</DataTable.Cell>
              <DataTable.Cell numeric>{profile.isMale}</DataTable.Cell>
            </DataTable.Row>

            {/* CID */}
            <DataTable.Row style={styles.profileRow}>
              <DataTable.Cell>CCCD</DataTable.Cell>
              <DataTable.Cell numeric>{profile.cid}</DataTable.Cell>
            </DataTable.Row>

            {/* Verify */}
            <DataTable.Row style={styles.profileRow}>
              <DataTable.Cell>Tình trạng xác thực</DataTable.Cell>
              <DataTable.Cell numeric textStyle={{ color: theme.colors.error }}>
                {profile.isVerified ? 'Đã xác thực' : 'Chưa'}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Surface>
        <View style={styles.buttonView}>
          <TouchableHighlight activeOpacity={0.6}>
            <Button
              icon='chevron-double-right'
              style={styles.button}
              textColor={theme.colors.onPrimary}
              contentStyle={styles.buttonContent}
              onPress={() => {}}
            >
              Hợp đồng của tôi
            </Button>
          </TouchableHighlight>

          <TouchableHighlight activeOpacity={0.6}>
            <Button
              icon='chevron-double-right'
              style={styles.button}
              textColor={theme.colors.onPrimary}
              contentStyle={styles.buttonContent}
              onPress={() => {}}
            >
              Xác thực CCCD
            </Button>
          </TouchableHighlight>
        </View>
      </Header>
    </View>
  );
};
