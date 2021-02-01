import TrackPlayer from 'react-native-track-player';
import store from '../../store/store';
import { resetPlayer } from '../../actions/audio';

module.exports = async function() {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

  TrackPlayer.addEventListener('remote-seek', () => TrackPlayer.seekTo());

  TrackPlayer.addEventListener('playback-track-changed', async (data) => {

  });

  TrackPlayer.addEventListener('playback-queue-ended', (data) => { 
    store.dispatch(resetPlayer());
  });
}