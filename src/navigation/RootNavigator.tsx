import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EventDetailsScreen, HomeScreen} from '../screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
