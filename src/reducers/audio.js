import { SET_CURRENT_AUDIO } from '../actions/constants';

const current = {
  currentAudioId: null,
  currentAudioCaption: null,
  currentAudioUser: null,
}

export default (state = current, action) => {
  switch (action.type) {
    case SET_CURRENT_AUDIO:
      return {
        ...state,
        currentAudioId: action.currentAudioId,
        currentAudioCaption: action.currentAudioCaption,
        currentAudioUser: action.currentAudioUser,
        isPlaying: true
      }
    default:
      return state
  }
}