import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.logo}>Voice</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgb(52, 152, 219)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontWeight: '500',
    color: 'rgb(255, 255, 255)',
    fontSize: 40
  }
});