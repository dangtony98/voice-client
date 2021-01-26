import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default ({ navigation }) => {
  const onClosePressed = () => {
    navigation.navigate("Feed");
  }
  
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onClosePressed}
      >
        <Icon 
          name="close-outline" 
          size={25} 
          color="rgb(52, 152, 219)" 
        />
      </TouchableOpacity>
    </View>
  ); 
} 

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'rgb(46,204,113)'
  }
})