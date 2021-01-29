import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEVELOPMENT_URL, PRODUCTION_URL } from '../constants';

const register = async (payload, callback) => {
  axios.post(`${PRODUCTION_URL}/users/register`, payload)
  .then(response => {
      AsyncStorage.setItem('userToken', response.data.token);
      AsyncStorage.setItem('user', response.data.user);
      callback();
  })
  .catch((error) => {
      console.log('Error: ' + error);
  });
}

const login = async (payload, callback) => {
  axios.post(`${PRODUCTION_URL}/users/login`, payload)
  .then(response => {
      AsyncStorage.setItem('userToken', response.data.token);
      AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      console.log(response.data.user);
      callback();
  })
  .catch((error) => {
      console.log('Error: ' + error);
  });
}

const get_user = async (callback) => {
  axios.get(`${PRODUCTION_URL}/users/user`)
  .then(response => {
      AsyncStorage.setItem('user', JSON.stringify(response.data));
      callback();
  })
  .catch((error) => {
      console.log('Error: ' + error);
  });
}

export { register, login, get_user };