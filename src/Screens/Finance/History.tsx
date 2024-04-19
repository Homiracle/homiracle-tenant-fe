import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { InvoiceItem, ItfInvoiceItem } from '../../Components';

const History = ({ invoiceList }: { invoiceList: Array<ItfInvoiceItem> }) => {
  const itemList = invoiceList.filter(item => item.paidStatus === true);

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
