import iid from '@react-native-firebase/iid';
import {registerDeviceToken} from '../api/notifications';
import messaging from '@react-native-firebase/messaging';

const requestUserPermission = async () => {
  console.log('heheh');
  const permission = await messaging().requestPermission(); // ask user for permission
  console.log(permission);
};

const handleFCMToken = async () => {
  const fcmToken = await iid().getToken();
  registerDeviceToken(fcmToken);
};

export {handleFCMToken, requestUserPermission};
