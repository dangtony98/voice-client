import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import TextInput from '../generic/TextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableOpacityCustom from '../generic/TouchableOpacityCustom';
import TrackPlayer from 'react-native-track-player';
import Audio from '../audio/Audio';
import AudioBar from '../audio/AudioBar';
import CommentsModal from '../modals/CommentsModal';
import { get_feed } from '../../service/api/posts';
import { useIsFocused } from "@react-navigation/native";
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';

const POST_HEIGHT = 519;

const addTracks = async (feed) => {
  const tracks = feed.map(post => ({
    id: post._id,
    url: post.audio_key,
    title: post.caption,
    artist: post.user.username
  }));
  await TrackPlayer.add(tracks).then(() => {    

  });
}

export default ({ navigation }) => {
  const [search, setSearch] = useState(""); 
  const [selected, setSelected] = useState("trending");
  const [skip, setSkip] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const feedRef = useRef(null);
  const isFocused = useIsFocused();
  const { position, duration } = useTrackPlayerProgress(100);

  useEffect(() => {
    setSkip(0);
    get_feed(0, feed => {
      setPosts(feed);
      setSkip(prevState => prevState + feed.length);
      addTracks(feed); // fix
    });
  }, [isFocused]);

  const renderItem = ({ item }) => {
    return (
      <Audio 
        navigation={navigation}
        {...item}
        setCommentsModalVisible={setCommentsModalVisible}
        id={item._id}
      />
    );
  }

  const snapToNext = () => {

  }

  const handleMore = () => {
    get_feed(skip, feed => {
      setPosts(prevState => [...prevState, ...feed]);
      setSkip(prevState => prevState + feed.length);
      addTracks(feed); // fix
    });
  }

  const onRefresh = () => {
    setIsRefreshing(true);
    get_feed(0, async feed => {
      setIsRefreshing(false);
      setPosts(feed)
      setSkip(prevState => prevState + feed.length);
      await TrackPlayer.reset();
      addTracks(feed);
    })
  }

  const goIndex = () => {
    feedRef.current.scrollToIndex({ animated: true, index: 1 });
  };

  const onNotificationsPressed = () => {
    navigation.navigate('Notifications');
  }

  return (
    <View style={{ flex: 1 }}
    >
      <View style={styles.navBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput 
            value={search}
            placeholder='Try "Cornell"'
            onChangeText={setSearch}
            otherStyles={{ flex: 1, marginRight: 15 }}
          />
          <TouchableOpacity
            onPress={() => console.log('Nothing yet')}
          >
            <Icon name="notifications-outline" size={25} color="rgb(127,140,141)" />
          </TouchableOpacity>
        </View>
        <View style={styles.navBox}>
          <View style={selected == "following" && styles.navSelected}>
            <TouchableOpacityCustom
              title="Following"
              selected={selected == "following"}
              onPress={() => setSelected("following")}
            />
          </View>
          <View style={selected == "trending" && styles.navSelected}>
            <TouchableOpacityCustom
              title="Trending"
              selected={selected == "trending"}
              onPress={() => setSelected("trending")}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        onEndReached={() => handleMore()}
        onEndReachedThreshold={0.25}
        onRefresh={() => onRefresh()}
        refreshing={isRefreshing}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        snapToInterval={POST_HEIGHT}
        pagingEnabled
        getItemLayout={(data, index) => ({ length: POST_HEIGHT, offset: POST_HEIGHT * index, index })}
        ref={feedRef}
        style={{ flexGrow: 1 }}
      />
      <AudioBar />
      <Modal 
        isVisible={commentsModalVisible} 
        style={{ margin: 0, justifyContent: 'flex-end' }}
        swipeDirection='down'
        propagateSwipe={true}
      >
        <CommentsModal 
          navigation={navigation} 
          setCommentsModalVisible={setCommentsModalVisible}
        />
      </Modal>
  </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    paddingTop: 75,
    paddingHorizontal: 25,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  navBox: {
    flexDirection: 'row'
  },
  navSelected: {
    borderBottomColor: 'rgb(52, 152, 219)',
    borderBottomWidth: 2
  }
});

// useEffect(() => {
//   if (position && duration) {
//     if (position / duration > 0.99) {
//       goIndex();
//     }
//   }
// }, [position, duration]);