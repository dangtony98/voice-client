import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import CommentList from '../comment/CommentList';
import ReplyList from '../comment/ReplyList';

export default ({ 
  commentsPost,
  setCommentsModalVisible 
}) => {
  const [repliesComment, setRepliesComment] = useState(null);
  const stepRef = useRef(null);

  const onClose = () => {
    setCommentsModalVisible(false);
  }

  const handleScrollComments = (repliesComment, x) => {
    setRepliesComment(repliesComment);
    stepRef.current.scrollTo({ x, y: 0, animated: true})
  };

  const handleScrollReplies = (x) => {
    stepRef.current.scrollTo({ x, y: 0, animated: true})
  }
  
  return (
    <View style={styles.screen}>
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={false}
        ref={stepRef}
        nestedScrollEnabled={true}
      >
        <CommentList
          commentsPost={commentsPost}
          onClose={onClose}
          handleScroll={handleScrollComments}
        />
        <ReplyList 
          repliesComment={repliesComment}
          onClose={onClose}
          handleScroll={handleScrollReplies}
        />
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
  commentInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 25
  }
});