import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';

export default () => {
  const [isPlaying, setIsPlaying] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const { position, duration } = useTrackPlayerProgress(250);

  const slidingStarted = () => {
    setIsSeeking(true);
  };

  const slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };

  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  return (
    <View style={styles.audioBar}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View 
          style={{ height: 30, width: 30, borderRadius: 10, backgroundColor: 'rgba(52, 152, 219, 0.25)' }} 
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontWeight: '500' }}>maidul98</Text>
          <Text>Why I won't be taking the covid...</Text>
        </View>
      </View>
      <Slider
          style={{height: 20, width: '100%', marginTop: 15 }}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          onSlidingStart={slidingStarted}
          onSlidingComplete={slidingCompleted}
          minimumTrackTintColor="rgb(52, 152, 219)"
          maximumTrackTintColor="rgb(127,140,141)"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  audioBar: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: 'rgb(255, 255, 255)', 
    width: '100%', 
    borderTopColor: 'rgb(236,240,241)',
    borderTopWidth: 1
  }
});