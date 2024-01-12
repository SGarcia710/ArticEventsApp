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
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        request(PERMISSIONS.IOS.CALENDARS)
          .then(result => {
            // …
            console.log('Permission cool, ', result);
          })
          .catch(() => {
            console.log('The permission was denied');
          });
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
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
