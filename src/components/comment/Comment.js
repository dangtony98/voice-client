import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import { initVoteState, handleVote } from '../../service/votes/votes';

export default ({ item, handleScroll }) => {
  const [voteCount, setVoteCount] = useState(item.votes.voteCounts);
  const [voteState, setVoteState] = useState('NONE');

  useEffect(() => {
    initVoteState(item, setVoteState);
  }, []);

  return (
    <View style={styles.comment}>
      <View style={{ flexDirection: 'row' }}>
        <Image 
          source={{ uri: item.user.img_location }}
          style={[styles.commentImage, { marginRight: 15 }]} 
        />
        <View style={{ flex: 1 }}>
          <View 
            style={{ 
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 30,
            marginBottom: 15
          }}>
            <Text style={{ fontWeight: '500' }}>
              {item.user.username}
            </Text>
            <Text style={{ color: 'rgb(127,140,141)' }}>
              {moment(item.createdAt).fromNow(true)}
            </Text>
          </View>
          <Text>{item.body}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleVote(item, voteState, voteCount, 'UP', setVoteState, setVoteCount)}
                >
                <Icon 
                  name="arrow-up" 
                  size={20} 
                  color={(voteState == 'UP') ? 'rgb(52, 152, 219)' : 'rgb(127,140,141)'}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                {voteCount}
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleVote(item, voteState, voteCount, 'DOWN', setVoteState, setVoteCount)}
              >
                <Icon 
                  name="arrow-down" 
                  size={20} 
                  color={(voteState == 'DOWN') ? 'rgb(52, 152, 219)' : 'rgb(127,140,141)'}
                  style={{ marginLeft: 5 }} 
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleScroll(item, Dimensions.get('window').width)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            > 
              <Icon 
                name="chatbox" 
                size={20} 
                color={'rgb(127,140,141)'}
                style={{ marginLeft: 5 }} 
              />
              <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                {item.repliesCount}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    paddingVertical: 15,
    paddingHorizontal: 25
  },
  commentImage: {
    height: 30,
    width: 30,
    borderRadius: 10,
  },
});