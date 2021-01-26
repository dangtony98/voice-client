import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const get_feed = async (skip, callback) => {
  axios.get(`http://127.0.0.1:3000/posts/trending-posts?skip=${skip}`)
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
  axios.get(`http://127.0.0.1:3000/posts/audio/${audio_key}`,
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