import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants';

const getReplies = async (comment_id, skip, callback) => {
  const token = await AsyncStorage.getItem('userToken');
  axios.get(`${URL}/replies/${comment_id}?skip=${skip}`, {
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

const postReply = async (comment_id, payload, callback) => {
  const token = await AsyncStorage.getItem('userToken');
  axios.post(`${URL}/replies/new/${comment_id}`, payload, {
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

export { getReplies, postReply };