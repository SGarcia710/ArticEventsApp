import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import useEvents from '@app/api/hooks/useEvents';
import BookmarksFill from '@app/assets/icons/Bookmark_fill.svg';
import {EventCard} from '@app/components';
import {COLORS} from '@app/constants/colors';

const Home = () => {
  const {events, isLoading, error} = useEvents();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackNavigatorParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Text>Is Loading</Text>}
      {!isLoading && (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Incoming Events</Text>
            <Pressable onPress={() => navigation.navigate('Bookmarks')}>
              <BookmarksFill width={32} height={32} />
            </Pressable>
          </View>
          <FlatList
            keyExtractor={item => `${item.id}`}
            data={events!.data}
            renderItem={({item}) => <EventCard {...item} />}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

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
