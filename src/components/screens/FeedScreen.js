import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import TextInput from '../generic/TextInput';
import TouchableOpacity from '../generic/TouchableOpacity';
import TrackPlayer from 'react-native-track-player';
import Audio from '../audio/Audio';
import AudioBar from '../audio/AudioBar';
import { get_feed, get_audio } from '../../service/api/posts';
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';

const POST_HEIGHT = 519;

const addTracks = (feed) => {
  const tracks = feed.map(post => ({
    id: post._id,
    url: post.audio_key,
    title: post.caption,
    artist: post.user.username
  }));
  TrackPlayer.add(tracks).then(() => {    

  });
}

export default ({ navigation }) => {
  const [search, setSearch] = useState(""); 
  const [selected, setSelected] = useState("trending");
  const [skip, setSkip] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false); // TO-DO: Review
  const feedRef = useRef(null);
  const { position, duration } = useTrackPlayerProgress(100);

  useEffect(() => {
    if (position && duration) {
      if (position / duration > 0.99) {
        goIndex();
      }
    }
  }, [position, duration]);

  useEffect(() => {
    get_feed(skip, feed => {
      setPosts(feed);
      setSkip(prevState => prevState + feed.length);
      addTracks(feed);
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Audio 
        navigation={navigation}
        user={item.user}
        caption={item.caption}
        votes={item.votes}
        comments_count={item.comments_count}
        id={item._id}
      />
    );
  }

  const snapToNext = () => {
    // TO-DO
  }

  const handleMore = () => {
    get_feed(skip, feed => {
      setPosts(prevState => [...prevState, ...feed]);
      setSkip(prevState => prevState + feed.length);
      addTracks(feed);
    });
  }

  const onRefresh = () => {
    get_feed(skip, feed => {
      setPosts(feed)
      setSkip(prevState => prevState + feed.length);
      TrackPlayer.reset();
      addTracks(feed);
    })
  }

  const goIndex = () => {
    console.log(feedRef.current);
    feedRef.current.scrollToIndex({ animated: true, index: 1 });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.navBar}>
        <TextInput 
          value={search}
          placeholder='Try "Cornell"'
          onChangeText={setSearch}
        />
        <View style={styles.navBox}>
          <View style={selected == "following" && styles.navSelected}>
            <TouchableOpacity 
              title="Following"
              selected={selected == "following"}
              onPress={() => setSelected("following")}
            />
          </View>
          <View style={selected == "trending" && styles.navSelected}>
            <TouchableOpacity 
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
        refreshing={isFetching}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        snapToInterval={POST_HEIGHT}
        pagingEnabled
        getItemLayout={(data, index) => ({ length: POST_HEIGHT, offset: POST_HEIGHT * index, index })}
        ref={feedRef}
        style={{ flexGrow: 1 }}
      />
      <AudioBar />
  </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    paddingTop: 100,
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