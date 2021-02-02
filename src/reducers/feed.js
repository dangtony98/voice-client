import {
  SET_FEED,
  PAGINATE_FEED,
  SET_CURRENT_FEED,
  SET_CURRENT_FEED_INDEX,
  INC_CURRENT_FEED_INDEX,
} from '../actions/constants';

const current = {
  feeds: [
    {
      name: 'following',
      feed: [],
      skip: 0,
      index: 0,
    },
    {
      name: 'trending',
      feed: [],
      skip: 0,
      index: 0,
    },
  ],
  currentFeed: 'trending',
};

export default (state = current, action) => {
  switch (action.type) {
    case SET_FEED:
      return {
        ...state,
        feeds: state.feeds.map((feedItem) =>
          feedItem.name == action.name ? action.feedObject : feedItem,
        ),
      };
    case PAGINATE_FEED:
      return {
        ...state,
        feeds: state.feeds.map((feedItem) =>
          feedItem.name == action.name
            ? {
                ...feedItem,
                feed: [...feedItem.feed, ...action.feedArray],
                skip: action.skip,
              }
            : feedItem,
        ),
      };
    case SET_CURRENT_FEED:
      return {
        ...state,
        currentFeed: action.name,
      };
    case SET_CURRENT_FEED_INDEX:
      return {
        ...state,
        feeds: state.feeds.map((feedItem) =>
          feedItem.name == state.currentFeed
            ? {...feedItem, index: action.index}
            : feedItem,
        ),
      };
    case INC_CURRENT_FEED_INDEX:
      return {
        ...state,
        feeds: state.feeds.map((feedItem) =>
          feedItem.name == state.currentFeed
            ? {...feedItem, index: feedItem.index + 1}
            : feedItem,
        ),
      };
    default:
      return state;
  }
};
