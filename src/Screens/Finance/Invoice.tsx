import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { InvoiceItem } from '../../Components';
import { ItfInvoiceItem } from '../../Services/invoices/interface';

const Invoice = ({ invoiceList }: { invoiceList: Array<ItfInvoiceItem> }) => {
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
        data={invoiceList}
        renderItem={({ item }) => <InvoiceItem item={item} />}
      />
    </View>
  );
};

export { Invoice };
