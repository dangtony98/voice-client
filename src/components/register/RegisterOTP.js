import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

export default () => {
  return (
    <View 
      style={{ 
        width: Dimensions.get('window').width 
      }}
    >
      <Text>OTP Step</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});