import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TextInput from '../generic/TextInput';
import TouchableOpacity from '../generic/TouchableOpacity';
import TrackPlayer from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';

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
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const { position, duration } = useTrackPlayerProgress(250);

  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  const slidingStarted = () => {
    setIsSeeking(true);
  };

  const slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };

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
       <Slider
        style={{width: 400, height: 40}}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        onSlidingStart={slidingStarted}
        onSlidingComplete={slidingCompleted}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
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