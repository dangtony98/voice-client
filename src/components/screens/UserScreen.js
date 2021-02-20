import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileInfo from '../profile/ProfileInfo';
import FeedProfile from '../feed/FeedProfile';

export default ({ navigation }) => {
  const isFocused = useIsFocused();
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    console.log('A');
    (async () => {
      console.log('B');
      if (isFocused) {
        console.log('C');
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        console.log('UserScreen with: ');
        console.log(user);
        console.log(user._id);
        setProfileInfo(user);
      }
    })();
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.navBar}>
        <View />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('Unimplemented')}
        >
          <Icon 
            name="menu-outline" 
            size={25} 
            color="rgb(127, 140, 141)" 
          />
        </TouchableOpacity>
      </View>
      {profileInfo && (
        <>
          <ProfileInfo 
            profileInfo={profileInfo}
          />
          <FeedProfile 
            id={profileInfo._id}
            navigation={navigation}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    height: 100,
    paddingTop: 75,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(255, 255, 255)'
  }
});