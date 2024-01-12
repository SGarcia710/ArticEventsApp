import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import Close from '@app/assets/icons/Close_round.svg';
import {COLORS} from '@app/constants/colors';

const Bookmarks = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackNavigatorParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
        <Pressable onPress={navigation.goBack}>
          <Close width={32} height={32} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    color: COLORS.black,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
