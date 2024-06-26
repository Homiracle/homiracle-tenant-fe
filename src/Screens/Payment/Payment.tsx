import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, DataTable, RadioButton, Text } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Header, ItfInvoiceMoney } from '../../Components';
import { useAppTheme } from '../../Theme';
import { PaymentModal } from '../../Components/Payment';
import { useGetDeepLinksQuery, useGetQrMutation } from '../../Services';

const toVietnamCurrency = (input: number | string) => {
  return input.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};

export const Payment = () => {
  // states
  const [checked, setChecked] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [qrUrl, setQRUrl] = React.useState(
    'https://i.etsystatic.com/32954091/r/il/86ca0d/3742591777/il_570xN.3742591777_d6zp.jpg',
  );

  // constants
  const bank = {
    name: 'tpb',
    account: 10393455850,
  };
  const paymentMethods = ['VietQR', 'VNPay'];
  const invoiceData = {
    id: '3',
    name: 'Tiền nhà tháng 11/2023',
    price: 1600000,
    paidStatus: false,
    detail: [
      { id: '1', name: 'Tiền điện', amount: '100kWh', price: 300000 },
      { id: '2', name: 'Tiền nước', amount: '20m3', price: 1000000 },
      { id: '3', name: 'Tiền trọ', amount: '', price: 300000 },
    ],
  };

  // anothers
  const { data: deeplinks } = useGetDeepLinksQuery({ os: 'android' });
  const [getQr, { data: vietQr }] = useGetQrMutation();
  const theme = useAppTheme();
  const navigator = useNavigation();
  const styles = StyleSheet.create({
    dataTable: {
      borderStyle: 'solid',
      borderColor: theme.palettes.neutral['90'],
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    tableFooter: {
      borderStyle: 'solid',
      borderColor: theme.palettes.neutral['90'],
      borderTopWidth: 0.8,
      padding: hp(2),
    },
    radioBtn: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(2),
    },
    paymentBtn: {
      backgroundColor: theme.colors.primary,
      marginLeft: wp(10),
      marginTop: hp(2),
      width: wp(80),
    },
  });

  // functions
  const onBack = () => navigator.goBack();

  const onProceedPayment = async () => {
    switch (checked) {
      case 0:
        // VietQR
        getQr({ amount: invoiceData.price });
        setShowModal(true);
        break;

      case 1:
        // VNPay
        alert('Phương thức này đang được phát triển...');
        break;
    }
  };

  React.useEffect(() => {
    if (vietQr) {
      const { code, data } = vietQr;
      code === '00' && setQRUrl(data.qrDataURL);
    }
  }, [vietQr]);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header
        title='Thanh toán'
        height={0}
        mode='center-aligned'
        onBack={onBack}
      />
      <View style={{ paddingHorizontal: wp(2) }}>
        {/* Title */}
        <Text variant='titleMedium' style={{ padding: hp(2) }}>
          {invoiceData.name}
        </Text>
        {/* Invoice overview */}
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title>Tên</DataTable.Title>
            <DataTable.Title numeric>Tiêu thụ</DataTable.Title>
            <DataTable.Title numeric>Số tiền</DataTable.Title>
          </DataTable.Header>
          {invoiceData.detail.map((_: ItfInvoiceMoney, index: number) => (
            <DataTable.Row style={{ borderColor: 'transparent' }} key={index}>
              <DataTable.Cell>{_.name}</DataTable.Cell>
              <DataTable.Cell numeric>{_.amount}</DataTable.Cell>
              <DataTable.Cell numeric>
                {toVietnamCurrency(_.price)}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Header style={styles.tableFooter}>
            <DataTable.Cell>Tổng</DataTable.Cell>
            <DataTable.Cell> </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={{ fontWeight: 'bold' }}>
                {toVietnamCurrency(invoiceData.price)}
              </Text>
            </DataTable.Cell>
          </DataTable.Header>
        </DataTable>

        <View style={{ marginTop: hp(2) }}>
          {/* Title */}
          <Text variant='titleMedium' style={{ padding: hp(2) }}>
            Chọn phương thức thanh toán
          </Text>
          {/* Payment methods selection */}
          {paymentMethods.map((method: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.radioBtn}
              onPress={() => setChecked(index)}
            >
              <RadioButton
                color={'black'}
                value={`${index}`}
                status={checked === index ? 'checked' : 'unchecked'}
              />
              <Text>{method}</Text>
            </TouchableOpacity>
          ))}
          <Button
            style={styles.paymentBtn}
            textColor='white'
            onPress={onProceedPayment}
          >
            Xác nhận thanh toán
          </Button>
        </View>
      </View>

      {
        /* Modal show QR */
        showModal && (
          <PaymentModal
            uri={qrUrl}
            bankDeeplinks={deeplinks}
            bank={bank}
            price={invoiceData.price}
            hideModal={() => setShowModal(false)}
            paymentMethod={paymentMethods[checked]}
          />
        )
      }
    </View>
  );
};
