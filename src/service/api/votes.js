import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEVELOPMENT_URL, PRODUCTION_URL } from '../constants';

const cast_vote = async (payload, callback) => {
  const token = await AsyncStorage.getItem('userToken');
  axios.post(`${PRODUCTION_URL}/votes`, payload, {
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

export { cast_vote };