import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { View, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import Audio from '../audio/Audio';
import { setFeed, paginateFeed, setCurrentFeed, incCurrentFeedIndex } from '../../actions/feed';
import { getFeed } from '../../service/api/posts';
import { createTrack } from '../../service/audio/trackQueue';
import { resetPlayer, setCurrentTrack} from '../../actions/audio';
import { handleGetFeed } from '../../service/feed/feed'; 

import Modal from 'react-native-modal';
import CommentsModal from '../modals/CommentsModal';

import AudioBar from '../audio/AudioBar';

const POST_HEIGHT = 519.5;

// TO-DO: FIX AUTO-PAN
export const feedFeed = ({
  navigation,
  feeds,
  currentFeed,
  setFeed,
  paginateFeed
}) => {
  const isFocused = useIsFocused();
  const feedRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [commentsPost, setCommentsPost] = useState(null);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);

  useEffect(() => {
    handleGetFeed(currentFeed, 0, setFeed, () => {});
  }, [isFocused]);

  useEffect(() => {
    TrackPlayer.addEventListener('playback-queue-ended', (data) => {
      goIndex();
    });
  }, []);

  const setupCommentModal = (post) => {
    setCommentsPost(post);
    setCommentsModalVisible(true);
  }

  const goIndex = () => {
    store.dispatch(resetPlayer());
    store.dispatch(incCurrentFeedIndex());
    feeds = store.getState().feed.feeds;
    const { feed, index } = feeds[currentFeed];
    if (index < feed.length) {
      const track = feeds[currentFeed].feed[index];
      feedRef.current.scrollToIndex({ animated: true, index: index });
      store.dispatch(setCurrentTrack(createTrack(track)));
    }
  };

  const handleMore = () => {
    const skip = feeds[currentFeed].skip;
    getFeed(skip, (feedArray) => {
      paginateFeed(currentFeed, feedArray, skip + feedArray.length);
    });
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    handleGetFeed(currentFeed, 0, setFeed, async () => {
      setIsRefreshing(false);
      await TrackPlayer.reset();
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
        data={feeds[currentFeed].feed}
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
        getItemLayout={(data, index) => ({
          length: POST_HEIGHT,
          offset: POST_HEIGHT * index,
          index,
        })}
        ref={feedRef}
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

const mapStateToProps = ({feed}) => ({
  feeds: feed.feeds,
  currentFeed: feed.currentFeed,
});

const mapDispatchToProps = (dispatch) => ({
  setFeed: (name, feedObject) => dispatch(setFeed(name, feedObject)),
  paginateFeed: (name, feedArray, skip) => dispatch(paginateFeed(name, feedArray, skip)),
  setCurrentFeed: (name) => dispatch(setCurrentFeed(name)),
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
});

export default connect(mapStateToProps, mapDispatchToProps)(feedFeed);