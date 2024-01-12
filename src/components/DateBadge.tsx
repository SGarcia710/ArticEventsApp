import {COLORS} from '@app/constants/colors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {};

const DateBadge = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <Text style={styles.month}>July</Text>
      </View>
      <Text style={styles.day}>29</Text>
    </View>
  );
};

export default DateBadge;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(8,9,14,0.5)',
    borderWidth: 1,
    borderColor: COLORS.black2,
    borderRadius: 4,
    padding: 4,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthContainer: {
    backgroundColor: COLORS.pearl,
    paddingHorizontal: 8,
    borderRadius: 2,
  },
  month: {
    color: COLORS.black,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  day: {
    color: COLORS.pearl,
    fontSize: 22,
    paddingBottom: 0,
    marginBottom: 0,
  },
});
