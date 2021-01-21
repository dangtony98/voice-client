import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

export default ({ onPress, title, otherStyles }) => (
  <TouchableHighlight
    activeOpacity={0.5}
    underlayColor="rgb(41, 128, 185)" 
    onPress={onPress}
    style={[styles.touchableHighlight, otherStyles]}
  >
      <Text style={styles.text}>{title}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  touchableHighlight: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'rgb(52, 152, 219)',
    alignItems: 'center'
  },
  text: {
    color: 'rgb(255, 255, 255)'
  }
})