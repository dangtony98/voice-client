import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const get_feed = async (callback) => {
  axios.get(`http://127.0.0.1:3000/posts/trending-posts`)
  .then(response => {
      callback(response.data);
  })
  .catch((error) => {
      console.log('Error: ' + error);
  });
}

const get_post = async (audio_key, callback) => {
  axios.get(`http://127.0.0.1:3000/posts/audio/${audio_key}`)
  .then(response => {
      callback();
  })
  .catch((error) => {
      console.log('Error: ' + error);
  });
}

export { get_feed, get_post };

// skip