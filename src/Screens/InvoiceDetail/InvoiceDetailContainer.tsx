import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { InvoiceDetail } from './InvoiceDetail';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';

export type InvoiceDetailNavigatorProps = StackScreenProps<
  RootStackParamList,
  RootScreens.INVOICE
>;

export const InvoiceDetailContainer = ({
  route,
  navigation,
}: InvoiceDetailNavigatorProps) => {
  return <InvoiceDetail route={route} navigation={navigation} />;
};
