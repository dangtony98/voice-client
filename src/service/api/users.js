import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants';

const register = async (payload, callback) => {
  axios.post(`${URL}/users/register`, payload)
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
  axios.post(`${URL}/users/login`, payload)
  .then(response => {
      AsyncStorage.setItem('userToken', response.data.token);
      AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      callback();
  })
  .catch((error) => {
      console.log('Error: ' + error);
  });
}

const getUser = async (token, callback1, callback2) => {
  axios.get(`${URL}/users/user`, {
    headers: {
      Accept: 'application/json', 
      Authorization: token
    }
  })
  .then(response => {
      AsyncStorage.setItem('user', JSON.stringify(response.data));
      callback1();
  })
  .catch((error) => {
      console.log('Error: ' + error);
      callback2();
  });
}

export { register, login, getUser };