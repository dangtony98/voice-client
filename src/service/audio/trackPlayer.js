import TrackPlayer from 'react-native-track-player';
import store from '../../store/store';
import {resetPlayer} from '../../actions/audio';
import {incCurrentFeedIndex} from '../../actions/feed';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

  TrackPlayer.addEventListener('remote-seek', () => TrackPlayer.seekTo());

  TrackPlayer.addEventListener('playback-track-changed', async (data) => {});
};
