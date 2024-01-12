/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SWRConfig} from 'swr';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {fetcher} from './api';
import RootNavigator from './navigation/RootNavigator';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

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
    </SafeAreaProvider>
  );
}

export default App;
