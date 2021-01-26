/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.setupPlayer().then(() => {

});

TrackPlayer.updateOptions({
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_STOP,
    TrackPlayer.CAPABILITY_SEEK_TO,
    TrackPlayer.CAPABILITY_SKIP
  ]
});

AppRegistry.registerComponent(appName, () => App)
TrackPlayer.registerPlaybackService(() => require('./src/service/audio/trackPlayer.js'));