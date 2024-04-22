import React, { useState } from 'react';
import { Image, Linking, StyleSheet, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-searchable-dropdown-kj';
import * as Clipboard from 'expo-clipboard';

import { ModalCustom } from '../Modal';
import { useGetDeepLinksQuery } from '../../Services';

interface ItfProps {
  uri: string;
  paymentMethod: string;
  bankDeeplink: string;
  bankAccount: number;
  hideModal: () => void;
}

export const PaymentModal = ({
  uri,
  bankDeeplink,
  bankAccount,
  paymentMethod,
  hideModal,
}: ItfProps) => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [deeplinks, setDeeplinks] = useState([]);

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
    hideModal();
    // Linking.openURL(bankDeeplink);

    // copy bank account to clipboard
    await Clipboard.setStringAsync(String(bankAccount));
    const clipboard = await Clipboard.getStringAsync();
    console.log(clipboard);
  };

  return (
    <ModalCustom
      title={`Thanh toán qua ${paymentMethod}`}
      visible={true}
      onConfirm={onConfirmPayment}
      onDismiss={onCancelPayment}
      buttonText={[`Mở bằng ${value}`, 'Huỷ']}
    >
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        // placeholderStyle={styles.placeholderStyle}
        // selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        data={deeplinks}
        search
        maxHeight={300}
        labelField='label'
        valueField='value'
        placeholder={isFocus ? value : 'Tìm ngân hàng'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
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
      <Image
        alt='Sao chép thông tin tài khoản'
        source={{ uri: uri }}
        width={240}
        height={300}
      />
    </ModalCustom>
  );
};
