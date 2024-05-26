import { View } from 'native-base';
import React from 'react';
import { Invoice } from './Invoice';
import { History } from './History';

import { Header, TabView } from '../../Components';
import { TabButton } from '../../Components/TabView/TabButton';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useGetInvoicesQuery } from '../../Services/invoices';
import { ItfInvoiceItem } from '../../Services/invoices/interface';
import { useNavigation } from '@react-navigation/native';

export const Finance = () => {
  const tabs = ['Hoá đơn', 'Lịch sử giao dịch'];
  const { data } = useGetInvoicesQuery();
  const navigator = useNavigation();

  // state
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [invoiceList, setInvoiceList] = React.useState<ItfInvoiceItem[]>([]);

  // function
  const focusInvoices = () => {
    setActiveTab(0);
  };
  const focusHistory = () => {
    setActiveTab(1);
  };

  React.useEffect(() => {
    data && setInvoiceList(data);
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title='Tài chính'
        height={heightPercentageToDP(2)}
        mode='center-aligned'
        onBack={() => navigator.goBack()}
      />
      <TabView>
        <TabButton
          isClicked={activeTab === 0}
          name={tabs[0]}
          displayNumber={false}
          onFocus={focusInvoices}
        />
        <TabButton
          isClicked={activeTab === 1}
          name={tabs[1]}
          displayNumber={false}
          onFocus={focusHistory}
        />
      </TabView>
      {activeTab === 0 && <Invoice invoiceList={invoiceList} />}
      {activeTab === 1 && <History invoiceList={invoiceList} />}
    </View>
  );
};
