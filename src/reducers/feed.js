import {
  SET_FEED,
  PAGINATE_FEED,
  SET_CURRENT_FEED,
  SET_CURRENT_FEED_INDEX,
  INC_CURRENT_FEED_INDEX,
} from '../actions/constants';

const current = {
  feeds: {
    following: {
      feed: [],
      skip: 0,
      index: 0
    },
    trending: {
      feed: [],
      skip: 0,
      index: 0
    },
    profile: {
      feed: [],
      skip: 0,
      index: 0
    }
  },
  currentFeed: 'trending',
}

export default (state = current, action) => {
  switch (action.type) {
    case SET_FEED:
      return {
        ...state,
        feeds: {
          ...state.feeds,
          [action.name]: action.feedObject
        }
      };
    case PAGINATE_FEED:
      return {
        ...state,
        feeds: {
          ...state.feeds,
          [action.name]: {
            ...state.feeds[action.name],
            feed: [...feeds[action.name].feed, action.feedArray],
            skip: action.skip
          }
        }
      };
    case SET_CURRENT_FEED:
      return {
        ...state,
        currentFeed: action.name,
      };
    case SET_CURRENT_FEED_INDEX:
      return {
        ...state,
        feeds: {
          ...state.feeds,
          [state.currentFeed]: {
            ...state.feeds[state.currentFeed],
            index: action.index
          }
        }
      };
    case INC_CURRENT_FEED_INDEX:
      return {
        ...state,
        feeds: {
          ...state.feeds,
          [state.currentFeed]: {
            ...state.feeds[state.currentFeed],
            index: state.feeds[state.currentFeed].index + 1
          }
        }
      };
    default:
      return state;
  }
};
