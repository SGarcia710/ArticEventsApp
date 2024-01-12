import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useCallback} from 'react';
import Animated from 'react-native-reanimated';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {COLORS} from '../components/colors';

import {NativeModules} from 'react-native';

const {CalendarManager} = NativeModules;

type Props = {
  route: RouteProp<RootStackParamList, 'EventDetails'>;
};

const EventDetails = ({route}: Props) => {
  const {event} = route.params;

  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  const addEventToCalendar = () => {
    const title = 'Sample Event';
    const location = 'Sample Location';
    const startDate = new Date('2024-01-13T09:00:00'); // Replace with your start date
    const endDate = new Date('2024-01-13T10:00:00'); // Replace with your end date
    console.log('HERE I AM');
    CalendarManager.addEvent(title, location, startDate, endDate);
    console.log('HERE I AM 2');
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Animated.Image
          sharedTransitionTag={event.slug}
          style={[styles.image, {width}]}
          source={{uri: event.image_url}}
        />
      </View>
      <Pressable onPress={navigation.goBack}>
        <Text>BACK</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          // Function to add event to iOS calendar

          // Call the function to add an event
          addEventToCalendar();
        }}>
        <Text>Add to calendar</Text>
      </Pressable>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.desc}>{event.description}</Text>
    </ScrollView>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f3640',
  },
  image: {
    height: 300,
  },
  title: {
    color: COLORS.white,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  desc: {
    color: COLORS.white,
    fontSize: 16,
  },
});
