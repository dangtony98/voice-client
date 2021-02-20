import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Image, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import AudioToggle from './AudioToggle';
import { setCurrentTrack, setIsPlaying } from '../../actions/audio';
import { setCurrentFeedIndex } from '../../actions/feed';
import { createTrack } from '../../service/audio/trackQueue';
import { initVoteState, handleVote } from '../../service/votes/votes';

export const audio = ({ 
  navigation,
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
    initVoteState(item, setVoteState);
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

  return (
    <View style={styles.audio} onLayout={(event) => {
      // TO-DO: remove in product; currently kept for reference
      var {x, y, width, height} = event.nativeEvent.layout;
      console.log(height);
    }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Profile', {
          id: user._id
        })}
      >
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
      </TouchableOpacity>
      <ImageBackground 
        source={{ uri: art_location }}
        style={[styles.audioImage, { alignItems: 'center' }]}
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
            onPress={() => handleVote(item, voteState, voteCount, 'UP', setVoteState, setVoteCount)}
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
            onPress={() => handleVote(item, voteState, voteCount, 'DOWN', setVoteState, setVoteCount)}
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
          onPress={() => setupCommentModal(item)}
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
      <View style={{ height: 25, paddingHorizontal: 25 }}>
        <Text>{caption}</Text>
      </View>
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
    paddingVertical: 15
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
    alignSelf: 'stretch'
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  bottomGroup: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15
  }
});