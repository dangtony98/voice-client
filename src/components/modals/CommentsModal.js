import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, FlatList, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Dimensions, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Comment from '../comment/Comment';
import { get_best_comments, post_comment } from '../../service/api/comments';

export default ({ 
  commentsPostId,
  setCommentsModalVisible 
}) => {
  // comments
  const [comments, setComments] = useState([]);
  const [commentsSkip, setCommentsSkip] = useState(0);
  const stepRef = useRef(null);

  // comment input
  const [comment, setComment] = useState('');

  useEffect(() => {
    get_best_comments(commentsPostId, commentsSkip, commentsArray => {
      setComments(commentsArray);
      console.log(commentsArray);
    });
  }, [commentsPostId]);

  const onClose = () => {
    setCommentsModalVisible(false);
  }

  const onPostComment = () => {
    if (comment != '') {
      post_comment(commentsPostId, { body: comment }, data => {
        setComment('');
        get_best_comments(commentsPostId, commentsSkip, commentsArray => {
          setComments(commentsArray);
        });
      });
    }
  }

  const handleScroll = (x) => {
    stepRef.current.scrollTo({ x, y: 0, animated: true})
  };

  const renderItem = ({ item }) => {
    return (
      <Comment 
        item={item} 
        handleScroll={handleScroll} 
      />
    );
  }
  
  return (
    <View style={styles.screen}>
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={false}
        ref={stepRef}
      >
        <View style={{ width: Dimensions.get('window').width }}>
          <View style={styles.commentsTop}>
            <Text style={{ fontWeight: '500', marginBottom: 15 }}>Comments</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onClose}
            >
              <Icon 
                name="close-outline" 
                size={25} 
                color="rgb(127,140,141)"
              />
            </TouchableOpacity>
          </View>
          <FlatList 
            data={comments}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            style={{ flex: 1 }}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.commentInput}>
              <TextInput 
                value={comment} 
                placeholder="Write a comment..."
                multiline={true}
                numberOfLines={5}
                onChangeText={text => setComment(text)}
                style={{ flex: 1 }}
              />
              <TouchableOpacity 
                onPress={() => onPostComment()}
                style={{ marginLeft: 15 }}
              >
                <Text style={{ color: 'rgb(52, 152, 219)', fontWeight: '500',}}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={{ width: Dimensions.get('window').width }}>
          <View style={styles.commentsTop}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => handleScroll(0)}
              >
                <Icon 
                  name="chevron-back" 
                  size={25} 
                  color="rgb(127,140,141)"
                />
              </TouchableOpacity>
              <Text style={{ fontWeight: '500', marginLeft: 15 }}>Replies</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onClose}
            >
              <Icon 
                name="close-outline" 
                size={25} 
                color="rgb(127,140,141)"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  ); 
} 

const styles = StyleSheet.create({
  screen: {
    height: Dimensions.get('window').height,
    backgroundColor: 'rgb(255, 255, 255)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  commentsTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 75,
    paddingHorizontal: 25
  },
  comment: {
    paddingVertical: 15,
    paddingHorizontal: 25
  },
  commentImage: {
    height: 30,
    width: 30,
    borderRadius: 10,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 25
  }
});