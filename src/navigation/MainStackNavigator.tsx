import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {BookmarksScreen, EventDetailsScreen, HomeScreen} from '@app/screens';

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Index" component={HomeScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen
        name="Bookmarks"
        options={{
          animation: 'slide_from_bottom',
        }}
        component={BookmarksScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
