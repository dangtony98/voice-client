import React from 'react';
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

export default ({ item, handleScroll }) => {

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
            <Text style={{ fontWeight: '500' }}>{item.user.username}</Text>
            <Text style={{ color: 'rgb(127,140,141)' }}>{moment(item.createdAt).fromNow(true)}</Text>
          </View>
          <Text>{item.body}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => console.log('Unfinished')}
              >
                <Icon 
                  name="arrow-up" 
                  size={20} 
                  color={'rgb(127,140,141)'}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 5, fontWeight: '500' }}>{item.votes.voteCounts}</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => console.log('Unfinished')}
              >
                <Icon 
                  name="arrow-down" 
                  size={20} 
                  color={'rgb(127,140,141)'}
                  style={{ marginLeft: 5 }} 
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleScroll(Dimensions.get('window').width)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            > 
              <Icon 
                name="chatbox" 
                size={20} 
                color={'rgb(127,140,141)'}
                style={{ marginLeft: 5 }} 
              />
              <Text style={{ marginLeft: 5, fontWeight: '500' }}>{item.repliesCount}</Text>
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