import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';

export const audioBar = ({ 
  currentAudioId, 
  currentAudioUser, 
  currentAudioCaption
}) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const { position, duration } = useTrackPlayerProgress(100);
  const playbackState = usePlaybackState();

  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }

    if (position == duration) {
      TrackPlayer.pause();
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

  const togglePlay = () => {
    if (playbackState == TrackPlayer.STATE_PAUSED) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  }

  return currentAudioId ? (
    <View style={styles.audioBar}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View 
            style={{ height: 30, width: 30, borderRadius: 10, backgroundColor: 'rgba(52, 152, 219, 0.25)' }} 
          />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontWeight: '500' }}>{currentAudioUser}</Text>
            <Text>{currentAudioCaption.substring(0, 40)}</Text>
          </View>
        </View>
        <TouchableOpacity 
          activeOpacity={0.5}
          onPress={togglePlay}
        >
          {(playbackState == TrackPlayer.STATE_PLAYING) ? (
            <Icon name="pause" size={25} color="rgb(52, 152, 219)" />
          ) : (
            <Icon name="play" size={25} color="rgb(52, 152, 219)" />
          )}
        </TouchableOpacity>
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
  ) : (
    <View />
  );
}

const mapStateToProps = ({ audio}) => ({
  currentAudioId: audio.currentAudioId,
  currentAudioCaption: audio.currentAudioCaption,
  currentAudioUser: audio.currentAudioUser
});

export default connect(mapStateToProps, null)(audioBar)

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