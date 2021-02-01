import { 
  RESET_PLAYER,
  SET_CURRENT_TRACK, 
  SET_IS_PLAYING,
  CLEAR_QUEUE,
  ENQUEUE,
  DEQUEUE 
} from './constants';

const resetPlayer = () => ({
  type: RESET_PLAYER
});

const setCurrentTrack = (track) => ({
  type: SET_CURRENT_TRACK,
  track
});

const setIsPlaying = (isPlaying) => ({
  type: SET_IS_PLAYING,
  isPlaying
});

const enqueue = (track) => ({
  type: ENQUEUE,
  track
});

const dequeue = () => ({
  type: DEQUEUE
});

const clearQueue = () => ({
  type: CLEAR_QUEUE
});

export { 
  resetPlayer,
  setCurrentTrack,
  setIsPlaying,
  clearQueue,
  enqueue,
  dequeue
};