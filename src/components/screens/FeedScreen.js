import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { View } from 'react-native';
import { setCurrentFeed } from '../../actions/feed';
import FeedNav from '../feed/FeedNav';
import FeedFeed from '../feed/FeedFeed';

export const feedScreen = ({
  navigation,
  currentFeed,
  setCurrentFeed,
}) => {
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // case: FeedScreen is mounted
      setCurrentFeed('trending');
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <FeedNav 
        search={search}
        setSearch={setSearch}
        currentFeed={currentFeed}
        setCurrentFeed={setCurrentFeed}
      />
      <FeedFeed 
        navigation={navigation}
      />
    </View>
  );
};

const mapStateToProps = ({feed}) => ({
  currentFeed: feed.currentFeed,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentFeed: (name) => dispatch(setCurrentFeed(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(feedScreen);