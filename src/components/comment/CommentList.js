import React, { useState, useEffect } from 'react';
import { 
  View, 
  Dimensions,
  Platform,
  TouchableOpacity, 
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Comment from './Comment';

import { 
  getBestComments, 
  postComment 
} from '../../service/api/comments';

export default ({
  commentsPost,
  onClose,
  handleScroll
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsIds, setCommentsIds] = useState([]);
  const [commentsSkip, setCommentsSkip] = useState(0);
  const [comment, setComment] = useState('');

  const getInitComments = () => {
    setCommentsSkip(0);
    setComments([]);
    if (commentsPost) {
      getBestComments(commentsPost._id, 0, commentsArray => {
        setCommentsSkip(commentsArray.length);
        setComments(commentsArray);
        setCommentsIds(commentsArray.map(commentObject => commentObject._id));
        setIsRefreshing(false);
      });
    }
  }

  useEffect(() => {
    getInitComments();
  }, [commentsPost]);

  const onPostComment = () => {
    if (comment != '') {
      postComment(commentsPost._id, { body: comment }, data => {
        setComments(prevState => [data, ...prevState]);
        setCommentsIds(prevState => [data._id, ...prevState]);
        setComment('');
      });
    }
  }

  const renderItem = ({ item }) => {
    return (
      <Comment 
        item={item} 
        handleScroll={handleScroll} 
      />
    );
  }

  const handleMore = () => {
    getBestComments(commentsPost._id, commentsSkip, commentsArray => {
      // omit comments already added through onPostComment()
      const commentsToAdd = commentsArray.filter(commentObject => !commentsIds.includes(commentObject._id));
      setCommentsSkip(prevState => prevState + commentsArray.length);
      setComments(prevState => [...prevState, ...commentsToAdd]);
    });
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    getInitComments();
  }

  return (
    <View style={{ width: Dimensions.get('window').width }}>
      <View style={[styles.commentsTop, { marginBottom: 15 }]}>
        <Text style={{ fontWeight: '500' }}>
          {`Comments • ${commentsPost.comments_count}`}
        </Text>
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex : 1 }}
      >
        <FlatList 
          data={comments}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onEndReached={handleMore}
          onEndReachedThreshold={0.25}
          // keyboardDismissMode={'none'}
          // keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={true}
          style={{ flex: 1 }}
        />
        <View style={styles.commentsInput}>
          <TextInput 
            value={comment} 
            placeholder="Write a comment..."
            multiline={true}
            numberOfLines={5}
            onChangeText={text => setComment(text)}
            style={{ flex: 1 }}
          />
          <TouchableOpacity 
            onPress={onPostComment}
            style={{ marginLeft: 15 }}
          >
            <Text style={{ color: 'rgb(52, 152, 219)', fontWeight: '500',}}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  commentsTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 75,
    paddingHorizontal: 25
  },
  commentsInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 25
  }
});