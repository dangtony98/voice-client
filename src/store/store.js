import { createStore, combineReducers } from 'redux';
import audio from '../reducers/audio';

export default createStore(combineReducers({
  audio
}));