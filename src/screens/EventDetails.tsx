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
    const title = 'Sample Event2';
    const location = 'Sample Location2';
    const startDate = new Date('2024-02-18T09:00:00').getTime();
    const endDate = new Date('2024-02-18T12:00:00').getTime();

    CalendarManager.addEvent(title, location, startDate, endDate)
      .then((message: string) => {
        console.log(message); // Event added successfully!
      })
      .catch((errorMessage: string) => {
        console.error(errorMessage); // Handle the error message
      });
  };

  const startTime = event.start_time.split(':');
  const endTime = event.end_time.split(':');
  const startDate = new Date(event.start_date);
  startDate.setHours(parseInt(startTime[0]), parseInt(startTime[1]));
  const endDate = new Date(event.start_date);
  endDate.setHours(parseInt(endTime[0]), parseInt(endTime[1]));

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
      <Text style={styles.title}>
        {startDate.toString()}
        {startDate.getMonth()}
      </Text>
      <Text style={styles.title}>{endDate.toString()}</Text>
      <Text style={styles.title}>{event.start_time}</Text>
      <Text style={styles.title}>{event.end_time}</Text>
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
