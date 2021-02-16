import { getFeed } from '../api/posts';
import { getUserFeedWithId } from '../api/users';

const handleGetFeed = async (feedName, id, setFeed, callback) => {
  /* 
  [handleGetFeed] makes the initial call to get a feed for feedName,
  sets the feed, and calls callback() if the operation is successful
  */
  switch (feedName) {
    case 'following':
      break;
    case 'trending':
      // case: get the trending feed
      getFeed(0, async (feedArray) => {
        setFeed(feedName, {
          feed: feedArray,
          skip: feedArray.length,
          index: 0,
        });
        callback();
      });
      break;
    case 'profile':
      // case: get the profile feed 
      getUserFeedWithId(feedName, id, feedArray => {
        setFeed(feedName, {
          feed: feedArray,
          skip: feedArray.length,
          index: 0,
        });
      });
      break;
  }
}

const handlePaginateFeed = () => {
  // TO-DO
}

export { 
  handleGetFeed, 
  handlePaginateFeed 
};