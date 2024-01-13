import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ChevronLeft from '@app/assets/icons/Arrow_drop_left.svg';
import BookmarkLine from '@app/assets/icons/Bookmark.svg';
import {COLORS} from '@app/constants/colors';

type Props = {};

const Header = (props: Props) => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {top}]}>
      <Pressable style={styles.iconContainer} onPress={navigation.goBack}>
        <ChevronLeft fill={COLORS.black} width={32} height={32} />
      </Pressable>

      <Pressable style={styles.iconContainer} onPress={() => {}}>
        <BookmarkLine
          stroke={COLORS.black}
          strokeWidth={2}
          width={22}
          height={22}
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
    backgroundColor: COLORS.pearl,
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
