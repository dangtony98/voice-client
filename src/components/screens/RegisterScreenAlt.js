import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import RegisterNumber from '../register/RegisterNumber';
import RegisterOTP from '../register/RegisterOTP';

export default () => {
  const stepRef = useRef(null);

  const handleScroll = (x) => {
    stepRef.current.scrollTo({x, y: 0, animated: true})
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={{ flex: 1, backgroundColor: 'rgb(52, 152, 219)' }}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={true}
        ref={stepRef}
      >
        <RegisterNumber />
        <RegisterOTP />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});