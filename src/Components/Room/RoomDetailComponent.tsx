import React, { useEffect } from 'react';
import {  Text, View } from 'native-base';
import { Surface } from 'react-native-paper';
import { TextInput, StyleSheet } from 'react-native';
import { useAppTheme } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const RoomDetailComponent = ({ data }: any) => {
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    content: {
      flex: 1,
      flexDirection: 'column',
      gap: hp(2),
    },
    surface: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.colors.onPrimary,
      marginHorizontal: wp(2),
      borderRadius: wp(2),
      width: wp(96),
      paddingHorizontal: wp(4),
      paddingTop: hp(1),
      maxHeight: hp(50),
    },
    title: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    subTitle: {
      fontWeight: 'bold',
    },
    textInput: {
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 1,
      paddingVertical: hp(0.5),
      color: 'black',
    },
  });

  return (
    <View style={styles.content}>
      <Surface style={styles.surface}>
        <Text style={[theme.fonts.titleMedium, styles.title]}>
          {'Thông tin phòng ' + data?.name}
        </Text>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            gap: hp(2),
            marginTop: hp(1),
          }}
        >
          <View>
            <Text style={styles.subTitle}>Tên phòng</Text>
            <TextInput
              style={styles.textInput}
              defaultValue={data?.name}
              editable={false}
            />
          </View>
          <View style={{ flexDirection: 'row', gap: wp(2) }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Số phòng ngủ</Text>
              <TextInput
                placeholder=''
                style={styles.textInput}
                editable={false}
                defaultValue={String(data?.number_of_bedroom)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Số phòng vệ sinh</Text>
              <TextInput
                placeholder=''
                style={styles.textInput}
                editable={false}
                defaultValue={String(data?.number_of_bathroom)}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: wp(2) }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Diện tích</Text>
              <TextInput
                placeholder=''
                style={styles.textInput}
                editable={false}
                defaultValue={String(data?.acreage)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Số người ở tối đa</Text>
              <TextInput
                style={styles.textInput}
                editable={false}
                defaultValue={String(data?.max_tenant)}
              />
            </View>
          </View>
        </View>
      </Surface>
    </View>
  );
};
