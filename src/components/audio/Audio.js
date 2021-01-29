import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import AudioToggle from './AudioToggle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCurrentAudio } from '../../actions/audio';
import { cast_vote } from '../../service/api/votes';

export const audio = ({ 
  user, 
  caption, 
  votes, 
  comments_count, 
  id, 
  currentAudioId, 
  setCurrentAudio, 
  navigation 
}) => {
  const playbackState = usePlaybackState();
  const [voteCount, setVoteCount] = useState(votes.voteCounts);
  const [voteState, setVoteState] = useState('NONE');

  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      if (votes.downvoters.includes(user._id)) {
        setVoteState('DOWN');
      }
      
      if (votes.upvoters.includes(user._id)) {
        setVoteState('UP');
      }
    })();
  }, []);

  const togglePlay = async () => {
      if ((currentAudioId != id)) {
        // case: switch tracks  
        await TrackPlayer.skip(id);
        await TrackPlayer.play();
        setCurrentAudio(id, caption, user.username);
      } else {
        if (playbackState == TrackPlayer.STATE_PAUSED) {
          await TrackPlayer.play();
        } else {
          await TrackPlayer.pause();
        }
      }
  }

  const onHandleVote = (vote) => {
      if (voteState == vote) {
        // case: casted vote is same as vote state
        cast_vote({ voteType: '', postId: id }, () => {
          setVoteState('NONE');
          vote == 'UP' 
          ? setVoteCount(voteCount - 1) 
          : setVoteCount(voteCount + 1);
        });
      } else {
        // case: casted vote is different from vote state
        cast_vote({ voteType: vote.toLowerCase(), postId: id }, () => {
          setVoteState(vote);
          switch (voteState) {
            case 'UP':
              setVoteCount(voteCount - 2);
              break;
            case 'DOWN':
              setVoteCount(voteCount + 2);
              break;
            case 'NONE':
              vote == 'UP' 
              ? setVoteCount(voteCount + 1) 
              : setVoteCount(voteCount - 1);
              break;
          }
        });
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
      <View style={[styles.audioImage, { alignItems: 'center' }]}>
        <AudioToggle 
          isPlaying={playbackState == TrackPlayer.STATE_PLAYING && currentAudioId == id}
          onPress={() => togglePlay()}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomGroup}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onHandleVote('UP')}
          >
            <Icon 
              name="arrow-up" 
              size={25} 
              color={(voteState == 'UP') ? 'rgb(52, 152, 219)' : 'rgb(127,140,141)'}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 5, fontWeight: '500' }}>{voteCount}</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onHandleVote('DOWN')}
          >
            <Icon 
              name="arrow-down" 
              size={25} 
              color={(voteState == 'DOWN') ? 'rgb(52, 152, 219)' : 'rgb(127,140,141)'}
              style={{ marginLeft: 5 }} 
            />
          </TouchableOpacity>
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

const mapStateToProps = ({ audio}) => ({
  currentAudioId: audio.currentAudioId
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentAudio: (id, caption, user) => dispatch(setCurrentAudio(id, caption, user))
});

export default connect(mapStateToProps, mapDispatchToProps)(audio);

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