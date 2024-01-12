import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';

import {COLORS} from '@app/constants/colors';
import {BookmarksScreen, HomeScreen, SettingsScreen} from '@app/screens';

const Tab = createBottomTabNavigator<BottomTabsNavigatorParamList>();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.yellow,
        tabBarInactiveTintColor: COLORS.gray,
        // tabBarIcon: (focused, color, size) => {
        //   switch (route.name) {
        //     return focused ?
        //   }
        // },
      })}>
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;

const styles = StyleSheet.create({});
