import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';
import {COLORS} from '../constants/colors';

const EventCard = (props: ArticEvent) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
        <Text style={styles.desc}>{props.short_description}</Text>
      </View>
    </Pressable>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  container: {
    margin: 4,
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: COLORS.black2,
    borderRadius: 4,
  },
  body: {
    padding: 10,
  },
  title: {
    color: COLORS.white,
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
    color: COLORS.white,
    fontSize: 16,
  },
});
