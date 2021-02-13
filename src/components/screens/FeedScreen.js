import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { setCurrentFeed } from '../../actions/feed';
import FeedNav from '../feed/FeedNav';
import FeedFeed from '../feed/FeedFeed';

export const feedScreen = ({
  currentFeed,
  setCurrentFeed,
}) => {
  const [search, setSearch] = useState('');

  return (
    <View style={{flex: 1}}>
      <FeedNav 
        search={search}
        setSearch={setSearch}
        currentFeed={currentFeed}
        setCurrentFeed={setCurrentFeed}
      />
      <FeedFeed />
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