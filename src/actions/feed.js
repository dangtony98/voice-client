import { 
  SET_FEED,
  PAGINATE_FEED,
  SET_CURRENT_FEED,
  SET_CURRENT_FEED_INDEX,
  INC_CURRENT_FEED_INDEX
} from '../actions/constants';

const setFeed = (name, feedObject) => ({
  type: SET_FEED,
  name,
  feedObject
});

const paginateFeed = (name, feedArray, skip) => ({
  type: PAGINATE_FEED,
  name,
  feedArray,
  skip
});

const setCurrentFeed = (name) => ({
  type: SET_CURRENT_FEED,
  name
});

const setCurrentFeedIndex = (index) => ({
  type: SET_CURRENT_FEED_INDEX,
  index
});

const incCurrentFeedIndex = () => ({
  type: INC_CURRENT_FEED_INDEX
});

export { 
  setFeed, 
  paginateFeed, 
  setCurrentFeed, 
  setCurrentFeedIndex,
  incCurrentFeedIndex
};