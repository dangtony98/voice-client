import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import TextInput from '../generic/TextInput';
import TouchableOpacity from '../generic/TouchableOpacity';
import TrackPlayer from 'react-native-track-player';

import Audio from '../audio/Audio';
import { get_feed } from '../../service/api/posts';

const track = {
  id: '111',
  url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
  title: 'test',
  artist: 'test2'
}

TrackPlayer.add([track]).then(() => {    
  // Added track
});

export default ({ navigation }) => {
  const [search, setSearch] = useState(""); 
  const [selected, setSelected] = useState("trending");
  const [posts, setPosts] = useState([])
  const [isFetching, setIsFetching] = useState(false);

  // get feed is being triggered twice causing duplicates???
  useEffect(() => {
    get_feed((feed) => {
      setPosts(prevState => [...prevState, ...feed])
    });
  }, []);

  const renderItem = ({ item }) => {
    console.log('Item: ', item);
    return (
      <Audio 
        navigation={navigation}
        user={item.user}
        caption={item.caption}
        votes={item.votes}
        comments_count={item.comments_count}
      />
    );
  }

  return (
    <View>
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