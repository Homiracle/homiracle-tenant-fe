import { useAppTheme } from '../../Theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface RoomAndTenantProps {
  num_of_room?: number;
  num_of_tenant?: number;
}

export const RoomAndTenant = ({
  num_of_room,
  num_of_tenant,
}: RoomAndTenantProps) => {
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      width: wp(100),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      paddingHorizontal: wp(5),
    },
    inView: {
      width: wp(43),
      height: hp(9),
      borderRadius: 16,
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
      gap: wp(2),
    },
    left: {
      paddingLeft: wp(5),
      width: wp(25),
    },
    roomIconRight: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#6FFBBE',
    },
    tenantIconRight: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#FFDBCB',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.inView}>
        <View style={styles.left}>
          <Text style={[theme.fonts.titleMedium]}>
            {num_of_room ? num_of_room : 0}
          </Text>

          <Text style={[theme.fonts.bodySmall]}>Phòng trống</Text>
        </View>

        <View style={styles.roomIconRight}>
          <Icon name='home-variant' size={24} color='white' />
        </View>
      </View>

      <View style={styles.inView}>
        <View style={styles.left}>
          <Text style={[theme.fonts.titleMedium]}>
            {num_of_tenant ? num_of_tenant : 0}
          </Text>

          <Text style={[theme.fonts.bodySmall]}>Người ở</Text>
        </View>

        <View style={styles.tenantIconRight}>
          <Icon name='account-multiple' size={24} color='white' />
        </View>
      </View>
    </View>
  );
};
