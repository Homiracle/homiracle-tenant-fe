import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Dialog } from 'react-native-paper';
import { useAppTheme } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export interface ItfProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  buttonText?: string[]; // [confirmText, dismissText]
  onConfirm: () => void;
  onDismiss: () => void;
}

export const ModalCustom = (props: ItfProps) => {
  // props
  const { visible, title, children, buttonText, onConfirm, onDismiss } = props;

  // styles
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialog: {
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      width: wp(88),
      marginLeft: wp(6),
      paddingHorizontal: wp(5),
      display: 'flex',
    },
    title: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      fontSize: 20,
    },
    content: {
      alignItems: 'center',
    },
  });

  return (
    // <View style={styles.container}>
    <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
      <Dialog.Title style={styles.title}>{title}</Dialog.Title>

      <Dialog.Content style={styles.content}>{children}</Dialog.Content>

      <Dialog.Actions>
        <Button onPress={onDismiss} textColor={theme.colors.error}>
          {buttonText ? buttonText[1] : 'Hủy'}
        </Button>
        <Button onPress={onConfirm}>
          {buttonText ? buttonText[0] : 'Xác nhận'}
        </Button>
      </Dialog.Actions>
    </Dialog>
    // </View>
  );
};
