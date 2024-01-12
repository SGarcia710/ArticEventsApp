import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ChevronLeft from '../assets/icons/Arrow_drop_left.svg';
import BookmarkFill from '../assets/icons/Bookmark_fill.svg';
import BookmarkLine from '../assets/icons/Bookmark.svg';

import {COLORS} from '../constants/colors';

type Props = {};

const Header = (props: Props) => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {top}]}>
      <Pressable style={styles.iconContainer} onPress={navigation.goBack}>
        <ChevronLeft fill={COLORS.black} width={34} height={34} />
      </Pressable>

      <Pressable style={styles.iconContainer} onPress={() => {}}>
        <BookmarkLine
          stroke={COLORS.black2}
          strokeWidth={2}
          width={24}
          height={24}
        />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 20,
    right: 20,
  },
  iconContainer: {
    backgroundColor: COLORS.white2,
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
