import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { ItfInvoiceItem } from '../../Services/invoices/interface';
import { InvoiceItem } from '../../Components';
import { InvoiceStatus } from '../../Constants/Invoice';

const History = ({ invoiceList }: { invoiceList: Array<ItfInvoiceItem> }) => {
  const itemList = invoiceList.filter(
    item => item.status === InvoiceStatus.PAID,
  );

  return (
    <View style={{ marginBottom: hp(15) }}>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
          alignSelf: 'center',
          gap: 10,
          paddingBottom: hp(10),
        }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={itemList}
        renderItem={({ item }) => <InvoiceItem item={item} />}
      />
    </View>
  );
};

export { History };
