import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default ({ onPress, title, selected, otherStyles }) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={onPress}
    style={[styles.touchableOpacity, otherStyles]}
  >
      <Text 
        style={selected ? styles.textSelected : styles.textUnselected}
      >
        {title}
      </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  touchableOpacity: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  textSelected: {
    fontWeight: '500',
    color: 'rgb(52, 152, 219)'
  },
  textUnselected: {
    fontWeight: '500',
    color: 'rgb(127,140,141)'
  }
})