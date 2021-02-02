import {
  RESET_PLAYER,
  SET_CURRENT_TRACK,
  SET_IS_PLAYING,
  CLEAR_QUEUE,
  ENQUEUE,
  DEQUEUE,
} from '../actions/constants';

import TrackPlayer from 'react-native-track-player';

const current = {
  queue: [],
  currentTrack: null,
  isPlaying: false,
};

export default (state = current, action) => {
  switch (action.type) {
    case RESET_PLAYER:
      (async () => {
        await TrackPlayer.reset();
      })();
      return {
        ...this.state,
        queue: [],
        currentTrack: null,
        isPlaying: false,
      };
    case SET_CURRENT_TRACK:
      (async () => {
        await TrackPlayer.reset();
        await TrackPlayer.add(action.track);
        await TrackPlayer.play();
      })();
      return {
        ...state,
        currentTrack: action.track,
        isPlaying: true,
      };
    case SET_IS_PLAYING:
      (async () => {
        action.isPlaying 
        ? await TrackPlayer.play() 
        : await TrackPlayer.pause();
      })();
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case CLEAR_QUEUE:
      return {
        ...state,
        queue: [],
      };
    case ENQUEUE:
      return {
        ...state,
        queue: [...state.queue, action.track],
      };
    case DEQUEUE:
      return {
        ...state,
        queue: state.queue.slice(0, -1),
      };
    default:
      return state;
  }
};
