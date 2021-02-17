import iid from '@react-native-firebase/iid';
import { registerDeviceToken } from '../api/notifications';

const handleFCMToken = async () => {
  // const id = await iid().get();
  const fcmToken = await iid().getToken();
  registerDeviceToken(fcmToken);
}

export { handleFCMToken };