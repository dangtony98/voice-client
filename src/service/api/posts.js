import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRODUCTION_URL } from '../constants';

const get_feed = async (skip, callback) => {
  axios.get(`${PRODUCTION_URL}/posts/trending-posts?skip=${skip}`)
  .then(response => {
      callback(response.data);
  })
  .catch((error) => {
    console.log('Error: ' + error);
  });
}

const get_audio = async (audio_key, callback) => {
  const token = await AsyncStorage.getItem('userToken');
  console.log(token);
  axios.get(`${PRODUCTION_URL}/posts/audio/${audio_key}`,
  {
    headers: {
      Accept: 'application/json', 
      Authorization: token
    }
  })
  .then(response => {
    callback(response.data.audio_location);
  })
  .catch((error) => {
    console.log('Error: ' + error);
  });
}

export { get_feed, get_audio };