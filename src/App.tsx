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
