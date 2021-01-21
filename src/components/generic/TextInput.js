import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default ({ onChangeText, value, placeholder, secureTextEntry, otherStyles }) => (
    <TextInput 
      value={value}
      style={[styles.textInput, otherStyles]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      onChangeText={text => onChangeText(text)}
    />
);

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'rgba(52, 152, 219, 0.1)'
  }
})