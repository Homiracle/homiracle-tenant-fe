import React, { useState } from 'react';
import { Image, Linking, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-searchable-dropdown-kj';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Clipboard from 'expo-clipboard';

import { ModalCustom } from '../Modal';
import { ItfDeeplink } from '../../Services/payment/interface';
import { Snackbar } from 'react-native-paper';

interface ItfProps {
  uri: string;
  paymentMethod: string;
  bankDeeplinks?: ItfDeeplink;
  price: number;
  bank: { name: string; account: number };
  hideModal: () => void;
}

export const PaymentModal = ({
  uri,
  bankDeeplinks,
  bank,
  price,
  paymentMethod,
  hideModal,
}: ItfProps) => {
  const [appLink, setAppLink] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  const styles = StyleSheet.create({
    dropdown: {
      height: 60,
      width: '100%',
      borderColor: 'silver',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
  });

  const onCancelPayment = () => {
    hideModal();
  };

  const onConfirmPayment = async () => {
    if (appLink) {
      const deeplink = `${appLink}&ba=${bank.account}@${bank.name}&am=${price}`;

      // copy bank account to clipboard
      await Clipboard.setStringAsync(String(bank.account));

      Linking.openURL(deeplink);

      setSnackbarStatus(true);
      setSnackbarText(`
        Sao chép số tài khoản ${bank.account} thành công. 
        Đang mở ứng dụng...
      `);

      hideModal();
    } else {
      setSnackbarStatus(true);
      setSnackbarText('Vui lòng chọn ứng dụng ngân hàng.');
    }
  };

  return (
    <>
      <ModalCustom
        title={`Thanh toán qua ${paymentMethod}`}
        visible={true}
        onConfirm={onConfirmPayment}
        onDismiss={onCancelPayment}
        buttonText={[`Mở ứng dụng thanh toán`, 'Huỷ']}
      >
        <Image
          alt='Sao chép thông tin tài khoản'
          source={{ uri: uri }}
          width={240}
          height={300}
          style={{ marginBottom: hp(2) }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          // placeholderStyle={styles.placeholderStyle}
          // selectedTextStyle={styles.selectedTextStyle}
          // inputSearchStyle={styles.inputSearchStyle}
          // iconStyle={styles.iconStyle}
          data={bankDeeplinks?.apps || []}
          search
          maxHeight={300}
          labelField='bankName'
          valueField='appId'
          placeholder={isFocus ? appLink : 'Tìm ngân hàng'}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setAppLink(item.deeplink);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name='Safety'
          //     size={20}
          //   />
          // )}
        />
      </ModalCustom>
      <Snackbar
        visible={snackbarStatus}
        onDismiss={() => setSnackbarStatus(false)}
        action={{ label: 'Đóng', onPress: () => setSnackbarStatus(false) }}
      >
        {snackbarText}
      </Snackbar>
    </>
  );
};
