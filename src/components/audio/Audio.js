import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import AudioToggle from './AudioToggle';

export default ({ user, caption, votes, comments_count, id, navigation }) => {
  const [isPlaying, setIsPlaying] = useState(0);
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

  const togglePlay = async () => {
    let trackId = await TrackPlayer.getCurrentTrack();

    if (trackId == id) {
      // case: post in view is post that is playing
      if (isPlaying) {
        TrackPlayer.pause();
        setIsPlaying(false);
      } else {
        TrackPlayer.play();
        setIsPlaying(true);
      }
    } else {
      // case: post in view is not post that is playing
      setIsPlaying(true);
      TrackPlayer.pause();
      TrackPlayer.skip(id);
      TrackPlayer.play();
    }
  }

  const handleVote = (vote) => {
    // TO-DO: hook up API here
    switch (vote) {
      case 'upvote':
        // TO-DO
        break;
      case 'downvote':
        // TO-DO
        break;
    }
  }

  const onCommentsPressed = () => {
    navigation.navigate("Comments");
  }

  return (
    <View style={styles.audio} onLayout={(event) => {
      // TO-DO: remove in product; currently kept for reference
      var {x, y, width, height} = event.nativeEvent.layout;
      console.log(height);
    }}>
      <View style={[styles.top, { marginBottom: 15 }]}>
        <Image 
          source={{ uri: 'https://external-preview.redd.it/_o7PutALILIg2poC9ed67vHQ68Cxx67UT6q7CFAhCs4.png?auto=webp&s=2560c01cc455c9dcbad0d869116c938060e43212' }}
          style={[styles.userImage, { marginRight: 15 }]} 
        />
        <Text style={{ fontWeight: '500' }}>{user.username}</Text>
      </View>
      <View style={styles.audioImage}>
        <View style={{ alignItems: 'center' }}>
          <AudioToggle 
            isPlaying={isPlaying}
            onPress={() => togglePlay()}
          />
          {/* <Slider
            style={{height: 20, width: 300, marginTop: 15 }}
            minimumValue={0}
            maximumValue={1}
            value={sliderValue}
            onSlidingStart={slidingStarted}
            onSlidingComplete={slidingCompleted}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          /> */}
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomGroup}>
          <Icon 
            name="arrow-up" 
            size={25} 
            color="rgb(127,140,141)" 
          />
          <Text style={{ marginLeft: 5, fontWeight: '500' }}>{votes.voteCounts}</Text>
          <Icon 
            name="arrow-down" 
            size={25} 
            color="rgb(127,140,141)"
            style={{ marginLeft: 5 }} 
          />
        </View>
        <TouchableOpacity 
          activeOpacity={0.5}
          onPress={onCommentsPressed}
          style={styles.bottomGroup}
        >
          <Icon 
            name="chatbox" 
            size={25} 
            color="rgb(127,140,141)" 
          />
          <Text style={{ marginLeft: 5, fontWeight: '500' }}>{comments_count}</Text>
        </TouchableOpacity>
      </View>
      <Text>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  audio: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 25,
    paddingHorizontal: 25
  },
  userImage: {
    height: 30,
    width: 30,
    borderRadius: 10
  },
  audioImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    padding: 25,
    alignSelf: 'stretch',
    borderRadius: 10,
    backgroundColor: 'rgba(52, 152, 219, 0.25)'
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bottomGroup: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15
  }
});