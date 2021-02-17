import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants';

const registerDeviceToken = async (fcmToken) => {
  const token = await AsyncStorage.getItem('userToken');
  axios.post(`${URL}/devices/add-device`, {
    fcmToken
  }, {
    headers: { 
      Accept: 'application/json', 
      Authorization: token
    }
  })
  .then(response => {
    console.log('registerDeviceToken successful with response: ');
    console.log(response);
  })
  .catch((error) => {
    console.log('Error: ' + error);
  });
}

export { registerDeviceToken };