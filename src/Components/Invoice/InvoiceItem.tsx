import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, DataTable } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import theme from '../../Theme';
import { RootScreens } from '../../Constants/RootScreen';
import { ItfInvoiceItem } from '../../Services/invoices/interface';
import {
  PaymentName,
  InvoiceStatus,
  InvoiceStatusText,
} from '../../Constants/Invoice';

const toVietnamCurrency = (input: number | string) => {
  return input.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};

export const InvoiceItem = ({ item }: { item: ItfInvoiceItem }) => {
  const navigation = useNavigation();

  const [isExpanded, setIsExpanded] = React.useState(false);
  const navigator = useNavigation();

  const styles = StyleSheet.create({
    cardTitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    dataTable: {
      borderStyle: 'solid',
      borderColor: theme.palettes.neutral['90'],
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
  });

  const onPayment = () => {
    // @ts-ignore
    navigator.navigate(RootScreens.INVOICE, { invoice_id: item.invoice_id });
  };

  return (
    <Card style={{ width: wp(90), margin: wp(1) }}>
      <Card.Content>
        <View style={styles.cardTitle}>
          <Text variant='titleMedium'>{item.name}</Text>
          {item.status === InvoiceStatus.PAID ? (
            <Text style={{ color: theme.colors.primary }}>Đã thanh toán</Text>
          ) : (
            <Text style={{ color: theme.colors.error }}>
              {
                // @ts-ignore
                InvoiceStatusText[String(item.status).toUpperCase()]
              }
            </Text>
          )}
        </View>
        <Text>{toVietnamCurrency(item.total)}</Text>
      </Card.Content>
      <Card.Actions>
        {item.status !== InvoiceStatus.PAID && (
          <Button onPress={onPayment}>Thanh toán</Button>
        )}
      </Card.Actions>

      {!isExpanded && (
        <Button
          icon={'chevron-double-down'}
          onPress={() => setIsExpanded(true)}
        >
          Xem chi tiết
        </Button>
      )}

      {isExpanded && (
        <>
          <DataTable style={styles.dataTable}>
            <DataTable.Header>
              <DataTable.Title>Tên</DataTable.Title>
              <DataTable.Title numeric>Tiêu thụ</DataTable.Title>
              <DataTable.Title numeric>Số tiền</DataTable.Title>
            </DataTable.Header>
            {item.costs
              .filter(_ => _.cost > 0)
              .map(_ => (
                <DataTable.Row style={{ borderColor: 'transparent' }}>
                  <DataTable.Cell>
                    {
                      // @ts-ignore
                      PaymentName[_.name]
                    }
                  </DataTable.Cell>
                  <DataTable.Cell numeric> </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {toVietnamCurrency(_.cost)}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
          <Button
            icon={'chevron-double-up'}
            onPress={() => setIsExpanded(false)}
          >
            Thu gọn
          </Button>
        </>
      )}
    </Card>
  );
};
