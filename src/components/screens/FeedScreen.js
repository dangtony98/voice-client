import React, { useState } from 'react';
import { View, Text, StyleSheet, Touchable } from 'react-native';
import TextInput from '../generic/TextInput';
import TouchableOpacity from '../generic/TouchableOpacity';
import TrackPlayer from 'react-native-track-player';

// id, url, title, artist

const track = {
  id: '111',
  url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
  title: 'test',
  artist: 'test2'
}

TrackPlayer.add([track]).then(() => {    
  // Added track
});

export default ({ navigation }) => {
  const [search, setSearch] = useState(""); 
  const [selected, setSelected] = useState("trending");

  const handleFeed = () => {
    console.log('handleFeed() invoked');
  }

  const playAudio = () => {
    TrackPlayer.play();
  }

  const pauseAudio = () => {
    TrackPlayer.pause();
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
      <TouchableOpacity 
        title="Play Audio"
        onPress={() => playAudio()}
      />
      <TouchableOpacity 
        title="Pause Audio"
        onPress={() => pauseAudio()}
      />
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