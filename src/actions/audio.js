import { SET_CURRENT_AUDIO, SET_IS_PLAYING } from './constants';

const setCurrentAudio = (id, caption, user) => ({
  type: SET_CURRENT_AUDIO,
  currentAudioId: id,
  currentAudioCaption: caption,
  currentAudioUser: user
});

export { setCurrentAudio };