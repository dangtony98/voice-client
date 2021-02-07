import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Modal from 'react-native-modal';
import TextInput from '../generic/TextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableOpacityCustom from '../generic/TouchableOpacityCustom';
import TrackPlayer from 'react-native-track-player';
import Audio from '../audio/Audio';
import AudioBar from '../audio/AudioBar';
import CommentsModal from '../modals/CommentsModal';
import { getFeed } from '../../service/api/posts';
import { createTrack } from '../../service/audio/trackQueue';
import { setFeed, paginateFeed, setCurrentFeed, incCurrentFeedIndex } from '../../actions/feed';
import { resetPlayer, setCurrentTrack} from '../../actions/audio';

const POST_HEIGHT = 523;

export const feedScreen = ({
  navigation,
  feeds,
  currentFeed,
  setFeed,
  paginateFeed,
  setCurrentFeed,
}) => {
  // feed
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const feedRef = useRef(null);
  const isFocused = useIsFocused();

  // comments
  const [commentsPost, setCommentsPost] = useState(null);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);

  useEffect(() => {
    getFeed(0, async (feedArray) => {
      setFeed(currentFeed, {
        feed: feedArray,
        skip: feedArray.length,
        index: 0,
      });
    });
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
      feedRef.current.scrollToIndex({animated: true, index: index});
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
    getFeed(0, async (feedArray) => {
      setIsRefreshing(false);
      setFeed(currentFeed, {
        feed: feedArray,
        skip: feed.length,
        index: 0,
      });
      await TrackPlayer.reset();
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <Audio
        navigation={navigation}
        item={item}
        {...item}
        index={index}
        setupCommentModal={setupCommentModal}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.navBar}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            value={search}
            placeholder='Try "Cornell"'
            onChangeText={setSearch}
            otherStyles={{flex: 1, marginRight: 15}}
          />
          <TouchableOpacity onPress={() => console.log('')}>
            <Icon
              name="notifications-outline"
              size={25}
              color="rgb(127,140,141)"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.navBox}>
          <View style={currentFeed == 'following' && styles.navSelected}>
            <TouchableOpacityCustom
              title="Following"
              selected={currentFeed == 'following'}
              onPress={() => setCurrentFeed('following')}
            />
          </View>
          <View style={currentFeed == 'trending' && styles.navSelected}>
            <TouchableOpacityCustom
              title="Trending"
              selected={currentFeed == 'trending'}
              onPress={() => setCurrentFeed('trending')}
            />
          </View>
        </View>
      </View>
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
        style={{flexGrow: 1}}
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
};

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

export default connect(mapStateToProps, mapDispatchToProps)(feedScreen);

const styles = StyleSheet.create({
  navBar: {
    paddingTop: 75,
    paddingHorizontal: 25,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  navBox: {
    flexDirection: 'row',
  },
  navSelected: {
    borderBottomColor: 'rgb(52, 152, 219)',
    borderBottomWidth: 2,
  },
});
