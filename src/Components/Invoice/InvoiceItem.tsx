import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, DataTable } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import theme from '../../Theme';
import { ItfInvoiceItem, ItfInvoiceMoney } from '.';

const toVietnamCurrency = (input: number | string) => {
  return input.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};

export const InvoiceItem = ({ item }: { item: ItfInvoiceItem }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
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

  return (
    <Card style={{ width: wp(90), margin: wp(1) }}>
      <Card.Content>
        <View style={styles.cardTitle}>
          <Text variant='titleMedium'>{item.name}</Text>
          {item.paidStatus ? (
            <Text style={{ color: theme.colors.primary }}>Đã thanh toán</Text>
          ) : (
            <Text style={{ color: theme.colors.error }}>Chưa thanh toán</Text>
          )}
        </View>
        <Text>{toVietnamCurrency(item.price)}</Text>
      </Card.Content>
      <Card.Actions>
        {!item.paidStatus && (
          <Button onPress={() => console.log('hihi')}>Thanh toán</Button>
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
            {item.detail.map((_: ItfInvoiceMoney) => (
              <DataTable.Row style={{ borderColor: 'transparent' }}>
                <DataTable.Cell>{_.name}</DataTable.Cell>
                <DataTable.Cell numeric>{_.amount}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {toVietnamCurrency(_.price)}
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
