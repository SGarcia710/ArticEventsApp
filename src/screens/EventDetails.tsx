import {Header} from '@app/components';
import {COLORS} from '@app/constants/colors';
import {useBookmarks} from '@app/hooks/useBookmarks';
import CalendarManager from '@app/nativeModules/CalendarManager';
import {createDate} from '@app/utils';
import {RouteProp} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';
import RenderHTML from 'react-native-render-html';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

type Props = {
  route: RouteProp<MainStackNavigatorParamList, 'EventDetails'>;
};

const EventDetails = ({route}: Props) => {
  const {event} = route.params;
  const {checkBookmark, saveToBookmarks, removeFromBookmarks} = useBookmarks();

  const [bookmarkExists, setBookmarkexists] = useState(
    checkBookmark(event.id.toString()),
  );

  const {width} = useWindowDimensions();
  const {bottom} = useSafeAreaInsets();

  const startDate = useMemo(
    () => createDate(event.start_date, event.start_time),
    [],
  );

  const endDate = useMemo(() => createDate(event.end_date, event.end_time), []);

  const duration = useMemo(() => {
    const _duration = endDate.diff(startDate, 'hours').toObject();
    return _duration.hours as number;
  }, []);

  const addEventToCalendar = useCallback(() => {
    const title = event.title;
    const location = !!event.is_virtual_event
      ? event.virtual_event_url
      : event.location;
    const _startDate = startDate.toMillis();
    const _endDate = endDate.toMillis();

    CalendarManager.addEvent(title, location, _startDate, _endDate)
      .then(() => {
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
  }, []);

  const handleOnBookmarkPress = useCallback(() => {
    if (bookmarkExists) {
      removeFromBookmarks(event.id.toString());
      setBookmarkexists(false);
    } else {
      saveToBookmarks(event);
      setBookmarkexists(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        alwaysBounceVertical={false}
        bounces={false}
        style={styles.scrollContainer}>
        <Animated.Image
          sharedTransitionTag={event.slug}
          style={[styles.image, {width}]}
          source={{uri: event.image_url}}
        />
        <Header
          handleOnBookmarkPress={handleOnBookmarkPress}
          bookmarkExists={bookmarkExists}
        />

        <View style={styles.body}>
          <Text style={styles.title}>{event.title}</Text>

          {!!event.short_description && (
            <RenderHTML
              baseStyle={styles.shortDesc}
              contentWidth={width - 40}
              source={{
                html: event.short_description,
              }}
            />
          )}

          <View style={styles.subSectionContainer}>
            <Text style={styles.subTitle}>Date and Time</Text>
            <Text>
              {startDate.toFormat("'Starts on 'cccc, LLLL d - t ZZZZ''Z")}
              {/* {event.date_display} */}
            </Text>
          </View>

          <View style={styles.subSectionContainer}>
            <Text style={styles.subTitle}>Location</Text>
            {event.is_virtual_event && <Text>Online</Text>}
            {!event.is_virtual_event && <Text>{event.location}</Text>}
          </View>

          <View style={styles.subSectionContainer}>
            <Text style={styles.subTitle}>About this event</Text>
            <Text>
              {duration} hour{duration > 1 ? 's' : ''}
            </Text>

            {event.is_free && <Text>{'\n'}Free</Text>}

            {event.is_member_exclusive && <Text>{'\n'}Member Exclusive</Text>}

            {event.is_after_hours && <Text>{'\n'}After hours</Text>}
          </View>

          <View style={styles.subSectionContainer}>
            <Text style={styles.subTitle}>Description</Text>
            <RenderHTML
              contentWidth={width - 40}
              source={{
                html: event.description || '',
              }}
            />
          </View>
        </View>
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
  topContainer: {
    height: 300,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20,
  },
  image: {
    height: 300,
  },
  shortDesc: {
    marginBottom: 18,
  },
  title: {
    color: COLORS.black,
    fontSize: 32,
    fontWeight: 'bold',
  },
  desc: {
    color: COLORS.black,
    fontSize: 16,
  },
  calendarButtonContainer: {
    backgroundColor: '#b50938',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 8,
  },
  calendarButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subSectionContainer: {marginBottom: 24},
});
