import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const register = async (payload, callback) => {
  axios.post(`http://127.0.0.1:3000/users/register`, payload)
  .then((response) => {
      AsyncStorage.setItem('userToken', response.data.token);
      AsyncStorage.setItem('user', response.data.user);
      callback();
  })
  .catch((error) => {
      console.log('Error: ' + error);
  });
}

const login = async (payload, callback) => {
  axios.post(`http://127.0.0.1:3000/users/login`, payload)
  .then((response) => {
      AsyncStorage.setItem('userToken', response.data.token);
      AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      callback();
  })
  .catch((error) => {
      console.log('Error: ' + error);
  });
}

const get_user = async (callback) => {
  axios.get(`http://127.0.0.1:3000/users/user`)
  .then((response) => {
      console.log('user');
      console.log(response.data);
      AsyncStorage.setItem('user', JSON.stringify(response.data));
      callback();
  })
  .catch((error) => {
      console.log('Error: ' + error);
  });
}

export { register, login, get_user };