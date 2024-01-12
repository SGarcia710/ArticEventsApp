import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';

import useEvents from '@app/api/hooks/useEvents';
import {EventCard} from '@app/components';
import {COLORS} from '@app/constants/colors';

const Home = () => {
  const {events, isLoading, error} = useEvents();

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Text>Is Loading</Text>}
      {!isLoading && (
        <>
          <Text style={styles.title}>Incoming Events</Text>
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
  title: {
    color: COLORS.black,
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
