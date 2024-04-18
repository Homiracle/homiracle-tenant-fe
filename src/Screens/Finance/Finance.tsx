import { View } from 'native-base';
import React from 'react';
import { Invoice } from './Invoice';
import { History } from './History';

import { Header, ItfInvoiceItem, TabView } from '../../Components';
import { TabButton } from '../../Components/TabView/TabButton';

export const Finance = () => {
  const tabs = ['Hoá đơn', 'Lịch sử giao dịch'];
  const invoiceList: Array<ItfInvoiceItem> = [
    {
      id: '1',
      name: 'Tiền nhà tháng 09/2023',
      price: 1500000,
      paidStatus: true,
      detail: [
        { name: 'Tiền điện', amount: '100kWh', price: 300000 },
        { name: 'Tiền nước', amount: '20m3', price: 1000000 },
        { name: 'Tiền trọ', amount: '', price: 200000 },
      ],
    },
    {
      id: '2',
      name: 'Tiền nhà tháng 10/2023',
      price: 1300000,
      paidStatus: false,
      detail: [
        { name: 'Tiền điện', amount: '100kWh', price: 300000 },
        { name: 'Tiền nước', amount: '10m3', price: 500000 },
        { name: 'Tiền trọ', amount: '', price: 500000 },
      ],
    },
    {
      id: '3',
      name: 'Tiền nhà tháng 11/2023',
      price: 1600000,
      paidStatus: false,
      detail: [
        { name: 'Tiền điện', amount: '100kWh', price: 300000 },
        { name: 'Tiền nước', amount: '20m3', price: 1000000 },
        { name: 'Tiền trọ', amount: '', price: 300000 },
      ],
    },
  ];

  // state
  const [activeTab, setActiveTab] = React.useState<number>(0);

  // function
  const focusInvoices = () => {
    setActiveTab(0);
  };
  const focusHistory = () => {
    setActiveTab(1);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title='Tài chính'
        height={10}
        mode='center-aligned'
        onBack={() => {
          console.log('back');
        }}
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
