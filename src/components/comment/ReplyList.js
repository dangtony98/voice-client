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
import Reply from './Reply';

import { getReplies, postReply } from '../../service/api/replies';

export default ({
  repliesComment,
  onClose,
  handleScroll,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesIds, setRepliesIds] = useState([]);
  const [repliesSkip, setRepliesSkip] = useState(0);
  const [reply, setReply] = useState('');

  const getInitReplies = () => {
    setRepliesSkip(0);
    setReplies([]);
    if (repliesComment) {
      getReplies(repliesComment._id, 0, repliesArray => {
        setRepliesSkip(repliesArray.length);
        setReplies(repliesArray);
        setRepliesIds(repliesArray.map(replyObject => replyObject._id));
        setIsRefreshing(false);
      });
    }
  }

  useEffect(() => {
    getInitReplies();
  }, [repliesComment]);

  const onPostReply = () => {    
    if (reply != '') {
      postReply(repliesComment._id, {
        body: reply,
        replying_to_user: repliesComment.user._id
      }, data => {
        setReplies(prevState => [data, ...prevState]);
        setRepliesIds(prevState => [data._id, ...prevState]);
        setReply('');
      });
    }
  }

  const onBack = () => {
    handleScroll(0);
    setRepliesSkip(0);
    setReply('');
  }

  const onRefresh = () => {
    setIsRefreshing(true);
    getInitReplies();
  }

  const handleMore = () => {
    getReplies(repliesComment._id, repliesSkip, repliesArray => {
      // omit replies already added through onPostReply()
      const repliesToAdd = repliesArray.filter(replyObject => !repliesIds.includes(replyObject._id));
      setRepliesSkip(prevState => prevState + repliesArray.length);
      setReplies(prevState => [...prevState, ...repliesToAdd]);
    });
  };

  const renderItem = ({ item }) => {
    return (
      <Reply 
        item={item}
      />
    );
  }

  return (
    <View style={{ width: Dimensions.get('window').width }}>
      <View style={[styles.commentsTop, { marginBottom: 15 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onBack}>
            <Icon 
              name="chevron-back" 
              size={25} 
              color="rgb(127,140,141)"
            />
          </TouchableOpacity>
          <Text style={{ fontWeight: '500', marginLeft: 15 }}>
          {repliesComment ? `Replies • ${repliesComment.repliesCount}` : 'Replies'}
          </Text>
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
      {repliesComment && (
        <Comment 
          item={repliesComment} 
          handleScroll={() => {}} 
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
        enabled
        style={{ flex: 1 }}
      >
        <View style={{ flex : 1 }}>
        <FlatList 
          data={replies}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onEndReached={handleMore}
          showsVerticalScrollIndicator={true}
          style={{ flex: 1 }}
        />
        </View>

        <View style={styles.commentsInput}>
          <TextInput 
            value={reply}
            placeholder="Write a reply..."
            multiline={true}
            numberOfLines={5}
            onChangeText={text => setReply(text)}
            style={{ flex: 1 }}
          />
          <TouchableOpacity 
            onPress={onPostReply}
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