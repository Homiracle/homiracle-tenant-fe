import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card, Text, DataTable } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import theme from '../../Theme';
import { InvoiceDetailNavigatorProps } from './InvoiceDetailContainer';
import { CustomDialog, Header, Payment } from '../../Components';
import { useGetDetailInvoiceQuery } from '../../Services/invoices';
import { ItfInvoiceItem } from '../../Services/invoices/interface';
import { PaymentName } from '../../Constants/Invoice';

const toVietnamCurrency = (input: number | string) => {
  return input.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};

export const InvoiceDetail = (props: InvoiceDetailNavigatorProps) => {
  const { route, navigation } = props;
  const { invoice_id: invoiceId } = route.params;
  const name = `${route.name} ${invoiceId}`;

  const { data } = useGetDetailInvoiceQuery({ id: invoiceId });

  // states
  const [invoice, setInvoice] = React.useState<ItfInvoiceItem>();

  const styles = StyleSheet.create({
    cardTitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    dataTable: {
      marginVertical: hp(2),
      borderStyle: 'solid',
      borderColor: theme.palettes.neutral['90'],
      borderTopWidth: 1,
      // borderBottomWidth: 1,
    },
    footerRow: {
      borderStyle: 'solid',
      borderColor: theme.palettes.neutral['90'],
      borderTopWidth: 1,
    },
  });

  React.useEffect(() => {
    console.log(data);
    data && setInvoice(data);
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={name}
        height={hp(2)}
        mode='center-aligned'
        onBack={() => navigation.goBack()}
      />
      {!invoice ? (
        <ActivityIndicator animating={true} color='green' />
      ) : (
        <>
          <Card style={{ width: wp(96), margin: wp(2), alignSelf: 'center' }}>
            <Card.Content>
              <View style={styles.cardTitle}>
                <Text variant='titleMedium'>{invoice.name}</Text>
                <Text>
                  {invoice.start_paid_day.substring(4, 6) +
                    '/' +
                    invoice.start_paid_day.substring(0, 4)}
                </Text>
              </View>
              <DataTable style={styles.dataTable}>
                <DataTable.Header>
                  <DataTable.Title>Tên</DataTable.Title>
                  <DataTable.Title numeric>Tiêu thụ</DataTable.Title>
                  <DataTable.Title numeric>Số tiền</DataTable.Title>
                </DataTable.Header>
                {invoice.costs
                  .filter(_ => _.cost > 0)
                  .map((_, idx: number) => (
                    <DataTable.Row
                      key={idx}
                      style={{ borderColor: 'transparent' }}
                    >
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
                <DataTable.Row style={styles.footerRow}>
                  <DataTable.Cell>Tổng</DataTable.Cell>
                  <DataTable.Cell numeric> </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {toVietnamCurrency(invoice.total)}
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </Card.Content>
          </Card>
          <Payment />
        </>
      )}
    </View>
  );
};
