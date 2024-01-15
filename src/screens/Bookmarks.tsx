import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Close from '@app/assets/icons/Close_round.svg';
import {EventCard} from '@app/components';
import {COLORS} from '@app/constants/colors';
import {useBookmarks} from '@app/hooks/useBookmarks';

const Bookmarks = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackNavigatorParamList>>();
  const {getBookmarks} = useBookmarks();

  const [bookmarks, setBookmarks] = useState(getBookmarks());

  useFocusEffect(
    useCallback(() => {
      setBookmarks(getBookmarks());
    }, []),
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
        <Pressable onPress={navigation.goBack}>
          <Close width={32} height={32} />
        </Pressable>
      </View>
      {/* // Visual bug is possible because of reusing same eventCard Component */}
      <FlatList
        keyExtractor={item => `BOOKMARKS__${item.id}`}
        data={bookmarks}
        renderItem={({item}) => <EventCard {...item} />}
      />
    </SafeAreaView>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
