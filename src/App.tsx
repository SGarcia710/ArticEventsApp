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

import {fetcher} from './api';
import RootNavigator from './navigation/RootNavigator';

check(PERMISSIONS.IOS.CALENDARS)
  .then(result => {
    switch (result) {
      case RESULTS.DENIED:
        // The permission has not been requested / is denied but requestable
        request(PERMISSIONS.IOS.CALENDARS)
          .then(() => {
            // all ok
          })
          .catch(() => {
            // denied, inform
          });
        break;
      case RESULTS.GRANTED:
        // The permission is granted
        break;
      case RESULTS.BLOCKED:
        // The permission is denied and not requestable anymore, inform
        break;
    }
  })
  .catch(error => {
    // …
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
          <RootNavigator />
        </SWRConfig>
      </NavigationContainer>
      <ToastWrapper />
    </SafeAreaProvider>
  );
}

export default App;
