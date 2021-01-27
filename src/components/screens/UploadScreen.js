import React, { Component, useEffect } from 'react';
import { View } from 'react-native';

export default ({ navigation }) => {
  useEffect(() => {
    navigation.navigate('Modal');
  },[]);

  return (
    <View></View>
  );
}