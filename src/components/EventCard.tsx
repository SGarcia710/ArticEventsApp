import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';

import {COLORS} from '@app/constants/colors';
import {createDate} from '@app/utils';

const EventCard = (props: ArticEvent) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackNavigatorParamList>>();

  const {width} = useWindowDimensions();

  const startDate = useMemo(
    () => createDate(props.start_date, props.start_time),
    [],
  );

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('EventDetails', {event: props});
      }}>
      <Animated.Image
        sharedTransitionTag={props.slug}
        style={styles.image}
        source={{uri: props.image_url}}
      />
      <View style={styles.body}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.date}>{startDate.toFormat('ccc, LLL d - t')}</Text>
        {!props.is_virtual_event && (
          <Text style={styles.baseText}>{props.location}</Text>
        )}
        {props.is_virtual_event && <Text style={styles.baseText}>Online</Text>}

        {props.is_free && <Text style={styles.baseText}>{'\n'}Free</Text>}
      </View>
    </Pressable>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: COLORS.white,
  },
  body: {
    padding: 10,
  },
  title: {
    color: COLORS.black,
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
    marginBottom: 4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  desc: {
    color: COLORS.black,
    fontSize: 16,
  },
  date: {
    color: COLORS.black,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  baseText: {
    color: COLORS.black,
  },
});
