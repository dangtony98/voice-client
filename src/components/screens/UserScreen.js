import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default ({ navigation }) => (
  <View style={ styles.page}>
    <Image 
      source={{ uri: 'https://external-preview.redd.it/_o7PutALILIg2poC9ed67vHQ68Cxx67UT6q7CFAhCs4.png?auto=webp&s=2560c01cc455c9dcbad0d869116c938060e43212' }}
      style={{ height: 100, width: 100 }} 
    />
  </View>
);

const styles = StyleSheet.create({
  page: {
    paddingVertical: 100,
    paddingHorizontal: 25
  }
});