import { createStore, combineReducers } from 'redux';
import audio from '../reducers/audio';
import feed from '../reducers/feed';

export default createStore(combineReducers({
  audio,
  feed
}));