import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default ({ isPlaying, onPress }) => {
  
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View style={styles.audioToggle}>
        {isPlaying ? (
          <Icon name="pause" size={25} color="rgb(52, 152, 219)" />
        ) : (
          <Icon name="play" size={25} color="rgb(52, 152, 219)" />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  audioToggle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    height: 50,
    width: 50,
    borderRadius: 50
  }
})