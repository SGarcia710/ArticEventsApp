import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {
  NativeModules,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import Header from '../components/Header';
import {COLORS} from '../constants/colors';

const {CalendarManager} = NativeModules;

type Props = {
  route: RouteProp<RootStackParamList, 'EventDetails'>;
};

const EventDetails = ({route}: Props) => {
  const {event} = route.params;

  const {width} = useWindowDimensions();
  const {bottom} = useSafeAreaInsets();
  console.log(bottom);

  const addEventToCalendar = () => {
    const title = 'Sample Event2';
    const location = 'Sample Location2';
    const startDate = new Date('2024-02-18T09:00:00').getTime();
    const endDate = new Date('2024-02-18T12:00:00').getTime();

    CalendarManager.addEvent(title, location, startDate, endDate)
      .then((message: string) => {
        Toast.show({
          type: 'success',
          text1: 'Added!',
          text2: 'The event was added to your Calendar app.',
        });
      })
      .catch((errorMessage: Error) => {
        Toast.show({
          type: 'error',
          text1: 'Ups',
          text2: errorMessage.message,
        });
      });
  };

  const startTime = event.start_time.split(':');
  const endTime = event.end_time.split(':');
  const startDate = new Date(event.start_date);
  startDate.setHours(parseInt(startTime[0]), parseInt(startTime[1]));
  const endDate = new Date(event.start_date);
  endDate.setHours(parseInt(endTime[0]), parseInt(endTime[1]));

  return (
    <View style={styles.container}>
      <ScrollView
        alwaysBounceVertical={false}
        bounces={false}
        style={styles.scrollContainer}>
        <View>
          <Animated.Image
            sharedTransitionTag={event.slug}
            style={[styles.image, {width}]}
            source={{uri: event.image_url}}
          />
        </View>

        <Header />

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

      <Pressable
        onPress={addEventToCalendar}
        style={[styles.calendarButtonContainer, {marginBottom: bottom}]}>
        <Text style={styles.calendarButtonText}>Add to calendar</Text>
      </Pressable>
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flex: 1,
  },
  image: {
    height: 300,
  },
  title: {
    color: COLORS.black,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  desc: {
    color: COLORS.black,
    fontSize: 16,
  },
  calendarButtonContainer: {
    backgroundColor: COLORS.yellow,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 8,
  },
  calendarButtonText: {
    color: COLORS.black,
  },
});
