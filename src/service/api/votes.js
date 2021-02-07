import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants';

const castVote = async (payload, callback) => {
  const token = await AsyncStorage.getItem('userToken');
  axios.post(`${URL}/votes`, payload, {
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

export { castVote };