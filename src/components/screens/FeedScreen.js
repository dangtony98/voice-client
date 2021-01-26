import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import TextInput from '../generic/TextInput';
import TouchableOpacity from '../generic/TouchableOpacity';
import TrackPlayer from 'react-native-track-player';
import Audio from '../audio/Audio';
import { get_feed, get_audio } from '../../service/api/posts';
import { PrivateValueStore } from '@react-navigation/native';

const track = {
  id: '111',
  url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
  title: 'test',
  artist: 'test2'
}

TrackPlayer.add([track]).then(() => {    
  // Added track
});

const createTrack = async (audioKey, username, caption) => {
  // get_audio will be defunct
  get_audio("1611469547979.mp3", (audioUrl) => {
    return {
      id: audioKey,
      url: audioUrl,
      title: caption,
      artist: username
    }
  });
}

export default ({ navigation }) => {
  const [search, setSearch] = useState(""); 
  const [selected, setSelected] = useState("trending");
  const [skip, setSkip] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // createTrack(1, 2, 3);

  useEffect(() => {
    get_feed(skip, feed => {
      setPosts(feed);
      setSkip(prevState => prevState + feed.length);
      // TO-DO:
      // construct tracks and load them into the track player here...
      // also pass identifier information through to every post
      console.log(feed);
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
        audio_key={item.audio_key}
      />
    );
  }

  const snapToNext = () => {
    // TO-DO
  }

  const handleMore = () => {
    console.log('handleMore()');
    get_feed(skip, feed => {
      setPosts(prevState => [...prevState, ...feed]);
      setSkip(prevState => prevState + feed.length);
      console.log('New feed: ');
      console.log(feed);
    });
  }

  const onRefresh = () => {
    console.log('onRefresh() triggered');
    get_feed(skip, feed => {
      setPosts(feed)
      setSkip(prevState => prevState + feed.length);
      // TO-DO:
      // re-construct tracks and load them into the track player here...
      // also pass identifier infromation through to every post
    })
  }

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
        snapToInterval={564}
        pagingEnabled
        style={{ flexGrow: 1 }}
      />      
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