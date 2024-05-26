import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Card,
  Text,
  RadioButton,
  Button,
  Modal,
  Portal,
  Avatar,
} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-searchable-dropdown-kj';
import { Image } from 'native-base';
import { Linking } from 'react-native';

import { useGetDeeplinkQuery } from '../../Services/payment';
import { DeepLinksItf } from '../../Services/payment/interface';

export const Payment = () => {
  const methods = ['VietQR'];
  const { data: deeplinks } = useGetDeeplinkQuery();

  const [method, setMethod] = React.useState('VietQR');
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [isFocus, setIsFocus] = React.useState(false);
  const [qrImg, setQrImg] = React.useState(
    'https://i0.wp.com/chromebooklive.com/wp-content/uploads/2020/04/chrome-qr-code-url-generator.png?resize=100',
  );
  const [bankDeeplink, setBankDeeplink] = React.useState<DeepLinksItf>();

  // styles
  const styles = StyleSheet.create({
    radioBtn: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(4),
      padding: hp(1),
    },
    modal: {
      backgroundColor: 'wheat',
      paddingHorizontal: wp(5),
      width: wp(88),
      height: hp(48),
      margin: wp(6),
      borderRadius: 8,
    },
    qrImg: {
      width: wp(50),
      height: wp(50),
      alignSelf: 'center',
    },
    dropdown: {
      marginTop: hp(4),
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

  const onPayment = () => {
    if (method === 'VietQR') {
      setVisible(true);
    }
  };

  const onRedirect = () => {
    const url = value + `&am=${10000}&ba=10393455850@tpb`
    console.log(url);
    // value && Linking.openURL(value)
  };

  React.useEffect(() => {
    deeplinks && setBankDeeplink(deeplinks);
  }, [deeplinks]);

  return (
    <View>
      <Card style={{ width: wp(96), marginHorizontal: wp(2) }}>
        <Card.Content>
          <Text variant='titleMedium'>Chọn phương thức thanh toán</Text>

          <RadioButton.Group onValueChange={_ => setMethod(_)} value={method}>
            {methods.map((_, index: number) => (
              <View key={index} style={styles.radioBtn}>
                <RadioButton
                  value={_}
                  status={method === _ ? 'checked' : 'unchecked'}
                />
                <Text>{_}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </Card.Content>

        <Card.Actions>
          <Button onPress={onPayment}>Thanh toán</Button>
        </Card.Actions>
      </Card>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Image alt='QR Code' style={styles.qrImg} source={{ uri: qrImg }} />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={bankDeeplink?.apps}
            search
            maxHeight={300}
            labelField='appName'
            valueField='deeplink'
            placeholder={!isFocus ? 'Mở bằng' : '...'}
            searchPlaceholder='Tìm kiếm...'
            value={value}
            renderItem={item => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: wp(4),
                  padding: hp(2),
                  alignItems: 'center',
                }}
              >
                <Image
                  style={styles.iconStyle}
                  source={{ uri: item.appLogo }}
                  alt='Logo'
                />
                <Text>{item.appName}</Text>
              </View>
            )}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.deeplink);
              setIsFocus(false);
            }}
          />
          <Text
            style={{ textAlign: 'right', paddingTop: hp(2) }}
            onPress={onRedirect}
          >
            Mở bằng ứng dụng ngân hàng
          </Text>
        </Modal>
      </Portal>
    </View>
  );
};
