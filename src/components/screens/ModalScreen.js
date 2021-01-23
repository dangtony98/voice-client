import React from 'react';
import { View, StyleSheet } from 'react-native';

export default ({ navigation }) => (
  <View style={styles.screen}>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'rgb(52, 152, 219)'
  }
})