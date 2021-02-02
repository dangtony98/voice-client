import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Image, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import AudioToggle from './AudioToggle';
import { setCurrentTrack, setIsPlaying } from '../../actions/audio';
import { setCurrentFeedIndex } from '../../actions/feed';
import { createTrack } from '../../service/audio/trackQueue';
import { cast_vote } from '../../service/api/votes';

export const audio = ({ 
  item,
  index,
  user, 
  caption, 
  votes, 
  comments_count, 
  createdAt,
  currentTrack,
  isPlaying,
  setCurrentTrack, 
  setIsPlaying,
  setCurrentFeedIndex,
  setupCommentModal,
  art_location
}) => {
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
      if (currentTrack == null || (currentTrack.id != item._id)) {
        // case: new or different track
        const track = createTrack(item);
        setCurrentTrack(track);
        setCurrentFeedIndex(index);
      } else {
        // same track
        if (!isPlaying) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      }
  }

  const onHandleVote = (vote) => {
      if (voteState == vote) {
        // case: casted vote is same as vote state
        cast_vote({ voteType: '', vote_on_id: item._id }, () => {
          setVoteState('NONE');
          vote == 'UP' 
          ? setVoteCount(voteCount - 1) 
          : setVoteCount(voteCount + 1);
        });
      } else {
        // case: casted vote is different from vote state
        cast_vote({ voteType: vote.toLowerCase(), vote_on_id: item._id }, () => {
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

  return (
    <View style={styles.audio} onLayout={(event) => {
      // TO-DO: remove in product; currently kept for reference
      var {x, y, width, height} = event.nativeEvent.layout;
      console.log(height);
    }}>
      <View style={[styles.top, { marginBottom: 15 }]}>
        <Image 
          source={{ uri: user.img_location }}
          style={[styles.userImage, { marginRight: 15 }]} 
        />
        <View style={{ 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
        }}>
          <Text style={{ fontWeight: '500' }}>{user.username}</Text>
          <Text style={{ color: 'rgb(127,140,141)' }}>{moment(createdAt).fromNow(true)}</Text>
        </View>
      </View>
      <ImageBackground 
        source={{ uri: art_location }}
        style={[styles.audioImage, { alignItems: 'center' }]}
        imageStyle={{ borderRadius: 10 }}
      >
        <AudioToggle 
          isPlaying={isPlaying && (currentTrack.id == item._id)}
          onPress={() => togglePlay()}
        />
      </ImageBackground>
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
          <Text style={{ 
            marginLeft: 5, 
            fontWeight: '500',
            color: voteState != 'NONE' ? 'rgb(52, 152, 219)' : 'rgb(127,140,141)'
          }}>{voteCount}</Text>
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
          onPress={() => setupCommentModal(item._id)}
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

const mapStateToProps = ({ audio }) => ({
  currentTrack: audio.currentTrack,
  isPlaying: audio.isPlaying
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  setIsPlaying: (isPlaying) => dispatch(setIsPlaying(isPlaying)),
  setCurrentFeedIndex: (index) => dispatch(setCurrentFeedIndex(index))
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
    alignSelf: 'stretch'
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