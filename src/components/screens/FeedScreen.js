import React, { useState } from 'react';
import { View, Text, StyleSheet, Touchable } from 'react-native';
import TextInput from '../generic/TextInput';
import TouchableOpacity from '../generic/TouchableOpacity';

export default ({ navigation }) => {
  const [search, setSearch] = useState(""); 
  const [selected, setSelected] = useState("trending");

  const handleFeed = () => {
    console.log('handleFeed() invoked');
  }

  return (
    <View>
      <View style={styles.navBar }>
        <TextInput 
          value={search}
          placeholder='Try "Cornell"'
          onChangeText={setSearch}
        />
        <View style={styles.navBox}>
          <View style={selected == "following" && styles.navSelected}>
            <TouchableOpacity 
              title="Following"
              selected={selected == "following"}
              onPress={() => setSelected("following")}
            />
          </View>
          <View style={selected == "trending" && styles.navSelected}>
            <TouchableOpacity 
              title="Trending"
              selected={selected == "trending"}
              onPress={() => setSelected("trending")}
            />
          </View>
        </View>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    paddingTop: 100,
    paddingHorizontal: 25,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  navBox: {
    flexDirection: 'row'
  },
  navSelected: {
    borderBottomColor: 'rgb(52, 152, 219)',
    borderBottomWidth: 2
  }
});