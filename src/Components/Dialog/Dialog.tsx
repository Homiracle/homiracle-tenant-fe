import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Dialog } from 'react-native-paper';
import { useAppTheme } from '../../Theme';

export interface DialogProps {
  visible: boolean;
  title?: string;
  content?: string;
  onDismiss?: () => void;
  onConfirm: () => void;
  confirmContent?: string;
}

export const CustomDialog: React.FC<DialogProps> = ({
  visible,
  title,
  content,
  onDismiss,
  onConfirm,
  confirmContent = 'Xác nhận',
}) => {
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
      width: '80%',
      padding: 20,
    },
    title: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      fontSize: 20,
    },
    content: {
      color: theme.colors.onSurface,
      fontSize: 16,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Dialog visible={visible} onDismiss={onDismiss}>
        {title && <Dialog.Title style={styles.title}>{title}</Dialog.Title>}
        {content && (
          <Dialog.Content>
            <Text style={styles.content}>{content}</Text>
          </Dialog.Content>
        )}
        <Dialog.Actions>
          {onDismiss && (
            <Button onPress={onDismiss} textColor={theme.colors.error}>
              Hủy
            </Button>
          )}
          <Button onPress={onConfirm}>{confirmContent}</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};
