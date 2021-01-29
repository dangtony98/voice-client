import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

export default ({ navigation, testing }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    navigation.navigate('Modal');
  },[isFocused]);

  return (
    <View style={styles.screen}>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgb(52, 152, 219)'
  }
});