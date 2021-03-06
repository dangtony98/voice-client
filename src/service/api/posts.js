import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants';

const getFeed = async (skip, callback) => {
  axios.get(`${URL}/posts/trending-posts?skip=${skip}`)
  .then(response => {
      callback(response.data);
  })
  .catch((error) => {
    console.log('Error: ' + error);
  });
}

const getAudio = async (audio_key, callback) => {
  const token = await AsyncStorage.getItem('userToken');
  axios.get(`${URL}/posts/audio/${audio_key}`,
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

const postAudio = async (payload, callback) => {
  const token = await AsyncStorage.getItem('userToken');
  axios.post(`${URL}/posts/new`, payload, {
    headers: { 
      Accept: 'application/json', 
      Authorization: token
    }
  })
  .then(response => {
      callback();
  })
  .catch((error) => {
      console.log('Error: ' + error);
  });
}

export { getFeed, getAudio, postAudio };