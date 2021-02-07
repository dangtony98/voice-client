import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

export default () => {
  return (
    <View 
      style={{ 
        width: Dimensions.get('window').width
      }}
    >
      <Text style={styles.header}>Phone Number Step</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
    fontWeight: '700'
  },
});