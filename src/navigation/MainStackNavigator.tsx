import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {EventDetailsScreen} from '../screens';
import BottomTabsNavigator from './BottomTabsNavigator';

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Index" component={BottomTabsNavigator} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
