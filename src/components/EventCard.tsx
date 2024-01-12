import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';
import RenderHtml from 'react-native-render-html';

import {COLORS} from '../constants/colors';

const EventCard = (props: ArticEvent) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackNavigatorParamList>>();

  const {width} = useWindowDimensions();

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

        <RenderHtml
          contentWidth={width - 60}
          source={{
            html:
              props.short_description ||
              props.list_description ||
              props.header_description ||
              '',
          }}
        />
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
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  body: {
    padding: 10,
  },
  title: {
    color: COLORS.black,
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
    marginBottom: 4,
  },
  desc: {
    color: COLORS.black,
    fontSize: 16,
  },
});
