/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {SWRConfig} from 'swr';

import {fetcher} from '@app/api';
import MainStackNavigator from './navigation/MainStackNavigator';

check(PERMISSIONS.IOS.CALENDARS).then(result => {
  if (result === RESULTS.DENIED) {
    request(PERMISSIONS.IOS.CALENDARS);
  }
});

const ToastWrapper = () => {
  const {top} = useSafeAreaInsets();
  return <Toast topOffset={top} />;
};

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SWRConfig
          value={{
            fetcher,
          }}>
          <MainStackNavigator />
        </SWRConfig>
      </NavigationContainer>
      <ToastWrapper />
    </SafeAreaProvider>
  );
}

export default App;
