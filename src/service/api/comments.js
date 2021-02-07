import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants';

const getBestComments = async (post_id, skip, callback) => {
  const token = await AsyncStorage.getItem('userToken');
  axios.get(`${URL}/comments/sort/best/${post_id}?skip=${skip}`, {
    headers: {
      Accept: 'application/json', 
      Authorization: token
    }
  })
  .then(response => {
      callback(response.data);
  })
  .catch((error) => {
    console.log('Error: ' + error);
  });
}

const postComment = async (post_id, payload, callback) => {
  const token = await AsyncStorage.getItem('userToken');
  axios.post(`${URL}/comments/${post_id}`, payload, {
    headers: { 
      Accept: 'application/json', 
      Authorization: token
    }
  })
  .then(response => {
      callback(response.data);
  })
  .catch((error) => {
      console.log('Error: ' + error);
  });
}

export { getBestComments, postComment };