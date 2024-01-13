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
import RenderHTML from 'react-native-render-html';

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
      <View style={styles.topContainer}>
        <Animated.Image
          sharedTransitionTag={props.slug}
          style={styles.image}
          source={{uri: props.image_url}}
        />
        <View
          style={{
            flex: 1,
          }}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.date}>
            {startDate.toFormat('ccc, LLL d - t')}
          </Text>
        </View>
      </View>
      <RenderHTML
        contentWidth={width - 40}
        source={{
          html: props.short_description || '',
        }}
      />
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
  topContainer: {flex: 1, flexDirection: 'row'},
  title: {
    color: COLORS.black,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  image: {
    width: 120,
    height: 120,
    objectFit: 'cover',
    borderRadius: 8,
    marginRight: 8,
  },
  desc: {
    color: COLORS.black,
    fontSize: 16,
  },
  date: {
    color: COLORS.black,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
  },
  baseText: {
    color: COLORS.black,
  },
});
