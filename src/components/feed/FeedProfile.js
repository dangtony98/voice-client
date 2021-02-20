import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Audio from '../audio/Audio';
import Modal from 'react-native-modal';
import CommentsModal from '../modals/CommentsModal';
import AudioBar from '../audio/AudioBar';
import { getUserFeedWithId } from '../../service/api/users';

const POST_HEIGHT = 511;

export default ({
  id,
  navigation
}) => {
  console.log('FeedProfile');
  console.log(id);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [commentsPost, setCommentsPost] = useState(null);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);

  const [feed, setFeed] = useState([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    getUserFeedWithId(id, skip, feedArray => {
      setFeed(feedArray);
      setSkip(feedArray.length);
    });
  }, []);

  const setupCommentModal = (post) => {
    setCommentsPost(post);
    setCommentsModalVisible(true);
  }

  const handleMore = () => {
    getUserFeedWithId(id, skip, feedArray => {
      setFeed(feed => [...feed, ...feedArray]);
      setSkip(skip => skip + feedArray.length);
    });
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    getUserFeedWithId(id, skip, feedArray => {
      setFeed(feedArray);
      setSkip(feedArray.length);
      setIsRefreshing(false);
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <Audio
        item={item}
        {...item}
        index={index}
        navigation={navigation}
        setupCommentModal={setupCommentModal}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={feed}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onEndReached={() => handleMore()}
        onEndReachedThreshold={0.25}
        onRefresh={() => onRefresh()}
        refreshing={isRefreshing}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={POST_HEIGHT}
        pagingEnabled
        getItemLayout={(_, index) => ({
          length: POST_HEIGHT,
          offset: POST_HEIGHT * index,
          index,
        })}
        style={{ flexGrow: 1 }}
      />
      <AudioBar />
      <Modal
        isVisible={commentsModalVisible}
        style={{ margin: 0 }}
        propagateSwipe={true}
        onBackdropPress={() => setCommentsModalVisible(false)}
        onSwipeComplete={() => setCommentsModalVisible(false)}
      >
        <CommentsModal
          commentsPost={commentsPost}
          commentsModalVisible={commentsModalVisible}
          setCommentsModalVisible={setCommentsModalVisible}
        />
      </Modal>
    </View>
  );
}