import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEVELOPMENT_URL, PRODUCTION_URL } from '../constants';

const get_best_comments = async (post_id, skip, callback) => {
  const token = await AsyncStorage.getItem('userToken');
  axios.get(`${PRODUCTION_URL}/comments/sort/best/${post_id}?skip=${skip}`, {
    headers: {
      Accept: 'application/json', 
      Authorization: token
    }
  })
  .then(response => {
    console.log('get_best_comments');
    console.log(response);
      // callback(response.data);
  })
  .catch((error) => {
    console.log('Error: ' + error);
  });
}

export { get_best_comments };