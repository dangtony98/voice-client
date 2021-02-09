import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants';

const sendOTP = (phone_number, callback1, callback2) => {
  axios.post(`${URL}/authentication/send-otp/${phone_number}`)
  .then(response => {
      callback1();
  })
  .catch((error) => {
    callback2(error.response.data.msg);
  });
}

const verifyOTP = (phone_number, code, callback1, callback2) => {
  axios.post(`${URL}/authentication/onboard/verify-otp/${phone_number}/${code}`)
  .then(response => {
      AsyncStorage.setItem('onboardToken', response.data.token);
      callback1();
  })
  .catch((error) => {
    callback2(error.response.data.msg);
  });
}

const checkUsername = async (username, callback1, callback2) => {
  const onboardToken = await AsyncStorage.getItem('onboardToken');
  axios.post(`${URL}/authentication/onboard/check-username/${username}`, {
    onboard_token: onboardToken
  })
  .then(response => {
    console.log('checkUsername() with data: ');
    console.log(response.data);
    callback1(response.data);
  })
  .catch((error) => {
    callback2(error.response.data.msg);
  });
}

const registerUsername = async (username, callback1, callback2) => {
  const onboardToken = await AsyncStorage.getItem('onboardToken');
  axios.post(`${URL}/authentication/onboard/register-username`, {
    onboard_token: onboardToken,
    username
  })
  .then(response => {
    AsyncStorage.setItem('userToken', response.data.token);
    AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    callback1();
  })
  .catch((error) => {
    console.log(error.response);
    callback2(error.response);
  });
}

export { 
  sendOTP,
  verifyOTP,
  checkUsername,
  registerUsername
};