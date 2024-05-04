import React from 'react';
import * as Localization from 'expo-localization';
import { i18n, Language } from './Localization';
import { NativeBaseProvider } from 'native-base';
import { store, persistor } from './Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApplicationNavigator } from './Navigation';
import theme from './Theme';
import { PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';


// language
i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

LogBox.ignoreLogs([
  'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
]);

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <PaperProvider theme={theme}>
            <PersistGate loading={null} persistor={persistor}>
              <ApplicationNavigator />
            </PersistGate>
          </PaperProvider>
        </ErrorBoundary>
      </Provider>
    </NativeBaseProvider>
  );
}
