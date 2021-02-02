import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { get_best_comments } from '../../service/api/comments';

const DATA = [
  { _id: 'aa', comment: 'Wow very valuable information. Thanks for the upload' }, 
  { _id: 'absa', comment: 'This is really great stuff dude... Im actually so shoook' }, 
  { _id: 'acd', comment: 'ALorem ipsum dolor sit adipiscing elit3' }, 
  { _id: 'ade', comment: 'BLorem ipsum dolor sit adipiscing elit4' }, 
  { _id: 'ae', comment: 'CLorem ipsum dolor sit adipiscing elit5' },
  { _id: 'af', comment: 'DLorem ipsum dolor sit adipiscing elit6' },
  { _id: 'ag', comment: 'ELorem ipsum dolor sit adipiscing elit7' },
  { _id: 'ah', comment: 'FLorem ipsum dolor sit adipiscing elit8' }
];

export default ({ 
  commentsModalVisible, 
  setCommentsModalVisible 
}) => {
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (commentsModalVisible) {
      // populate comments
      // xyz??
      // get_best_comments()
    }
  }, [commentsModalVisible]);

  const onClosePressed = () => {
    setCommentsModalVisible(false);
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.comment}>
        <View style={[styles.commentGroup, {     
          paddingBottom: 15
        }]}>
          <Image 
            source={{ uri: 'https://external-preview.redd.it/_o7PutALILIg2poC9ed67vHQ68Cxx67UT6q7CFAhCs4.png?auto=webp&s=2560c01cc455c9dcbad0d869116c938060e43212' }}
            style={[styles.commentImage, { marginRight: 15 }]} 
          />
          <View style={{ flex: 1 }}>
            <View 
              style={{ 
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginBottom: 15
            }}>
              <Text style={{ fontWeight: '500' }}>johndoe</Text>
              <Text style={{ color: 'rgb(127,140,141)' }}>1s</Text>
            </View>
            <Text>{item.comment}</Text>
            <View style={[styles.commentGroup, { alignItems: 'center', marginTop: 15 }]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onHandleVote('UP')}
              >
                <Icon 
                  name="arrow-up" 
                  size={25} 
                  color={'rgb(127,140,141)'}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 5, fontWeight: '500' }}>1</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onHandleVote('DOWN')}
              >
                <Icon 
                  name="arrow-down" 
                  size={25} 
                  color={'rgb(127,140,141)'}
                  style={{ marginLeft: 5 }} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.screen}>
      <View style={styles.commentsTop}>
        <Text style={{ fontWeight: '500' }}>Comments</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onClosePressed}
        >
          <Icon 
            name="close-outline" 
            size={25} 
            color="rgb(127,140,141)"
          />
        </TouchableOpacity>
      </View>
      <FlatList 
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        style={{ flex: 1 }}
      />
      <TextInput 
        value={comment} 
        placeholder="Write a comment..."
        style={styles.commentInput}
        onChangeText={text => setComment(text)}
      />
    </View>
  ); 
} 

const styles = StyleSheet.create({
  screen: {
    height: Dimensions.get("window").height * 0.75,
    backgroundColor: 'rgb(255, 255, 255)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  commentsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingHorizontal: 25
  },
  comment: {
    paddingHorizontal: 25,
    paddingTop: 15,

  },
  commentGroup: {
    flexDirection: 'row'
  },
  commentImage: {
    height: 30,
    width: 30,
    borderRadius: 10,
  },
  commentInput: {
    padding: 15, 
    paddingBottom: 25
  }
})